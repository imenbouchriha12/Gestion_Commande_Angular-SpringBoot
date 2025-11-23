package com.example.demo.Auth;


import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import com.example.demo.Model.ModelPassword;
import com.example.demo.Model.PasswordResetToken;
import com.example.demo.Model.Product;
import com.example.demo.Model.UserRegisterToken;
import com.example.demo.Repository.PasswordResetTokenRepository;
import com.example.demo.Repository.UserRegisterTokenRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Service.ProductService;
import com.example.demo.Service.UserDetailsServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;



@CrossOrigin(origins = "*", allowedHeaders ="*")
@RequiredArgsConstructor
@RestController
@RequestMapping("apii/auth")
public class AuthenticationController {
    private final AuthenticationService service;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final UserRegisterTokenRepository userRegisterTokenRepository; 
    private final UserDetailsServiceImpl userDetailsService;
    private final  UserRepository rep;
    private final PasswordEncoder passwordEncoder;
        @Autowired
    ProductService servicepro;
    @RequestMapping(value="/Productss", method= RequestMethod.GET)
    List<Product> getAll(){
        List<Product> Products= servicepro.getAll();
        return Products;
    }
@PostMapping("/register")
public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
   
    return ResponseEntity.ok(service.register(request));
}

@PostMapping("/authenticate")
public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
   
    return ResponseEntity.ok(service.authenticate(request));
}  

@PostMapping("/refresh-token")
public void refreshToken(
    HttpServletRequest request,
    HttpServletResponse response
) throws IOException{
  service.refreshToken(request, response);
}

@GetMapping("/logout")
public void logout( HttpServletRequest request,
HttpServletResponse response) throws IOException{
   service.logout(request,response);
}


 @PostMapping("/register-client")
 public  ResponseEntity<?> registerClient(HttpServletRequest request, HttpServletResponse response,@RequestBody RegisterRequest user) {
      final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
                      final String token;
                      // final String userToUpdateEmail;
                      if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                          return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                      }
                      token = authHeader.substring(7);
                     

     Optional<UserRegisterToken> registerToken = userRegisterTokenRepository.findByToken(token);
        if(registerToken.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Invalid Token");
        }
        UserRegisterToken userRegisterToken = registerToken.get() ;
		if (userRegisterToken != null && userDetailsService.hasExipred(userRegisterToken.getExpiryDateTime())) {
            return ResponseEntity.ok(service.registerClient(user));

        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

     
 }
 @GetMapping("/registration-data/{token}")
 public ResponseEntity<?> getRegistrationData(@PathVariable String token) {
    Optional<UserRegisterToken> registerToken = userRegisterTokenRepository.findByToken(token);
    if(registerToken.isEmpty()) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Invalid Token");
    }

    return this.service.getUserByToken(registerToken);
}


 
}
