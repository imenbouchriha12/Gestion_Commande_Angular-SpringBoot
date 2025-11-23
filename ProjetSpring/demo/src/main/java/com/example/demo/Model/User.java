package com.example.demo.Model;

import java.util.Collection;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "_users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstname;
    private String lastname;
    private String address;
    private String telephone;
    @Temporal(TemporalType.DATE)
    private Date datebirth = new Date(); 
    private String description;
    private String password;
    @Column(unique = true)
    private String email;
    @Enumerated(EnumType.STRING)
    private Role role;  


   public boolean isAdmin() {
        return this.role == Role.ADMIN;
    }

    public boolean isClient() {
        return this.role == Role.CLIENT;
    }


    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstname() {
        return this.firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return this.lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTelephone() {
        return this.telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Date getDatebirth() {
        return this.datebirth;
    }

    public void setDatebirth(Date datebirth) {
        this.datebirth = datebirth;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return this.role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public User id(Long id) {
        setId(id);
        return this;
    }

    public User firstname(String firstname) {
        setFirstname(firstname);
        return this;
    }

    public User lastname(String lastname) {
        setLastname(lastname);
        return this;
    }

    public User address(String address) {
        setAddress(address);
        return this;
    }

    public User telephone(String telephone) {
        setTelephone(telephone);
        return this;
    }

    public User datebirth(Date datebirth) {
        setDatebirth(datebirth);
        return this;
    }

    public User description(String description) {
        setDescription(description);
        return this;
    }

    public User password(String password) {
        setPassword(password);
        return this;
    }

    public User email(String email) {
        setEmail(email);
        return this;
    }

    public User role(Role role) {
        setRole(role);
        return this;
    }



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
     return role.getAuthorities();
    }

    @Override
    public String getUsername() {
       return email;
    }
    
}
