package com.example.demo.Auth;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import org.jasypt.encryption.StringEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.example.demo.Model.Role;
import com.example.demo.Model.Token;
import com.example.demo.Model.TokenType;
import com.example.demo.Model.User;
import com.example.demo.Model.UserRegisterToken;
import com.example.demo.Repository.TokenRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Service.UserDetailsServiceImpl;
import com.example.demo.config.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
private final UserRepository repository;
private final PasswordEncoder passwordEncoder;
private final JwtService jwtService;
 private final TokenRepository tokenRepository;
private final AuthenticationManager authenticationManager;
private final UserDetailsServiceImpl userDetailsServiceImpl;
@Autowired
private UserDetailsServiceImpl detailsServiceImpl;
@Autowired
    private StringEncryptor stringEncryptor;



public AuthenticationResponse register(RegisterRequest request) {
  Role userRole = determineUserRole(request);
  Random rnd = new Random();
  int code = rnd.nextInt(999999);
  LocalDateTime now = LocalDateTime.now();
  LocalDateTime expirationTime = now.plusHours(1);
  Date expirationDate = Date.from(expirationTime.atZone(ZoneId.systemDefault()).toInstant());

var  user = User.builder()
.firstname(request.getFirstname())
.address(request.getAddress())
.telephone(request.getTelephone())
.datebirth(request.getDatebirth())
.lastname(request.getLastname())
.email(request.getEmail())
.description(request.getDescription())
.password(passwordEncoder.encode(request.getPassword()))
.role(userRole)
.build();

repository.save(user);
Map<String, Object> extraClaims = new HashMap<>();
extraClaims.put("roles", user.getAuthorities().stream()
    .map(GrantedAuthority::getAuthority) // Extract role strings
    .collect(Collectors.toList()));
    var jwtToken = jwtService.generateToken(extraClaims,user);var refreshToken = jwtService.generateRefreshToken(user);
var savedUser = repository.save(user);
saveUserToken(savedUser, jwtToken);
return AuthenticationResponse.builder()
.accessToken(jwtToken)
.refreshToken(refreshToken)
.build();

}
private Role determineUserRole(RegisterRequest request) {
  if (request.getEmail() != null && request.getEmail().equals("admin@gmail.com")) {
      return Role.ADMIN;
  } else {
      return Role.CLIENT; 
  }
}

public AuthenticationResponse authenticate(AuthenticationRequest request) {
   Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()
        ));
        var user = repository.findByEmail(request.getEmail())
        .orElseThrow();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        repository.save(user); 
     Map<String, Object> extraClaims = new HashMap<>();
    extraClaims.put("roles", userDetails.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority) // Extract role strings
        .collect(Collectors.toList()));
        var jwtToken = jwtService.generateToken(extraClaims,user);

    var refreshToken = jwtService.generateRefreshToken(user);
    revokeAllUserTokens(user);
    saveUserToken(user, jwtToken);
    return AuthenticationResponse.builder()
        .accessToken(jwtToken)
        .refreshToken(refreshToken)
        .build();
}
private void revokeAllUserTokens(User user) {
    var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
    if (validUserTokens.isEmpty())
      return;
    validUserTokens.forEach(token -> {
      token.setExpired(true);
      token.setRevoked(true);
    });
    tokenRepository.saveAll(validUserTokens);
  }
  public void refreshToken(
    HttpServletRequest request,
    HttpServletResponse response
) throws IOException {
final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
final String refreshToken;
final String userEmail;
if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
return;
}
refreshToken = authHeader.substring(7);
userEmail = jwtService.ExtractUsername(refreshToken);
if (userEmail != null) {
var user = this.repository.findByEmail(userEmail)
        .orElseThrow();
if (jwtService.isTokenValid(refreshToken, user)) {
  var accessToken = jwtService.generateToken(user);
  revokeAllUserTokens(user);
  saveUserToken(user, accessToken);
  var authResponse = AuthenticationResponse.builder()
          .accessToken(accessToken)
          .refreshToken(refreshToken)
          .build();
  new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
}
}
}

  private void saveUserToken(User user, String jwtToken) {
    var token = Token.builder()
        .user(user)
        .token(jwtToken)
        .tokenType(TokenType.BEARER)
        .expired(false)
        .revoked(false)
        .build();
    tokenRepository.save(token);
  }
  public void logout(
    HttpServletRequest request,
    HttpServletResponse response
) throws IOException {
final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
final String refreshToken;
final String userEmail;
if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
return ;
}
refreshToken = authHeader.substring(7);
userEmail = jwtService.ExtractUsername(refreshToken);
if (userEmail != null) {
var user = this.repository.findByEmail(userEmail)
        .orElseThrow();
if (jwtService.isTokenValid(refreshToken, user)) {
  revokeAllUserTokens(user); 
  return ;
}
}
}
                public ResponseEntity<?> registerClient(   RegisterRequest request) {
                  var userOp= this.repository.findByEmail(request.getEmail());
                  if(userOp.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"User not found");
        }
                      User user = userOp.get() ;
                      user.setFirstname(request.getFirstname());
                      user.setAddress(request.getAddress());
                      user.setDatebirth(request.getDatebirth());
                      user.setLastname(request.getLastname());
                      user.setLastname(request.getLastname());
                      user.setDescription(request.getDescription());
                      user.setPassword(passwordEncoder.encode(request.getPassword()));
                      user.setRole(Role.CLIENT);
                      user.setTelephone(request.getTelephone());
                    return  ResponseEntity.ok(this.repository.save(user));

                }
                public ResponseEntity<?> getUserByToken(Optional<UserRegisterToken> registerToken) {
                  var token =registerToken.get();
                 var userEmail = jwtService.ExtractUsername(token.getToken());
                 var userOp=this.repository.findByEmail(userEmail);
                  var user= userOp.get();
                 HashMap<String, Object> userData = new HashMap<>();
                 userData.put("id", user.getId());
                 userData.put("email", user.getEmail());
                 userData.put("firstname", user.getFirstname());
                 userData.put("lastname", user.getLastname());
                 return ResponseEntity.ok(userData);
                }

             public String encrypt(String plaintext) {
              return stringEncryptor.encrypt(plaintext);
          }
      
          public String decrypt(String encryptedText) {
              return stringEncryptor.decrypt(encryptedText);
          }
            
            }
