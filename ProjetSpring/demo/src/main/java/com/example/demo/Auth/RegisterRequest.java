package com.example.demo.Auth;

import java.util.Date;
import com.example.demo.Model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String firstname;
    private String lastname;
    private String address;
    private String email;
    private String password;
    private Date datebirth= new Date();
    private String description;
    private String telephone;
    private Role role;


}
