package com.example.demo.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import lombok.RequiredArgsConstructor;
import static com.example.demo.Model.Role.ADMIN;
import static com.example.demo.Model.Role.CLIENT;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;
    private final    LogoutHandler logoutHandler;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        
        http 
        .cors() // Enable CORS
        .and()
        .csrf()
        .disable()
        .authorizeHttpRequests()
        .requestMatchers("/apii/auth/**", "/Reset-Password-Request", "/resetPassword")
        .permitAll()
        .requestMatchers("/api/**").hasAnyRole(ADMIN.name(),CLIENT.name())
        .anyRequest()
        .authenticated()
        .and()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()    
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(jwtAuthenticationFilter,UsernamePasswordAuthenticationFilter.class)
        .logout()
        .logoutUrl("/apii/auth/logout")
        .addLogoutHandler(logoutHandler)
        .logoutSuccessHandler((request, response, authentication) -> {
            SecurityContextHolder.clearContext();

        })
        
        ;
        return http.build();
        
    }
    

}
