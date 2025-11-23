import { Component, OnInit } from '@angular/core';
import { Auth } from '../model/Auth';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { JwtDecoderService } from '../services/jwt-decoder.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessages: any[] = [];
  private auth :Auth= new Auth();
  display:string="display : none ;";
  message!:string;
  password: string = '';
  
  passwordType: string = 'password';
  regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  constructor(private LoginService : LoginService,
    private router:Router ,
    private tokenDecoder:JwtDecoderService,
    ){

  }
  ngOnInit(): void {
   
  }

  togglePasswordVisibility() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
  loginAttemptUser(val: any) {
    console.log("Tentative de login", val); // <-- Vérification console

    this.display = "";
  
    if (val.email === "" && val.password === "") {
      this.message = "Fields are empty!";
      return;
    } else if (val.email === "") {
      this.message = "Email field is empty";
      return;
    } else if (val.password === "") {
      this.message = "Password field is empty";
      return;
    } else {
      if (!this.regexp.test(val.email.toLowerCase())) {
        this.message = "Verify the email";
        return;
      }
    }
  
    this.auth.email = val.email;
    this.auth.password = val.password;
  
    const existingToken = localStorage.getItem("access_token");
    if (existingToken) {
      this.LoginService.logout(existingToken.replace(/^"(.*)"$/, '$1')).subscribe();
    }
  
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  
    this.LoginService.loginAtemptUser(this.auth).subscribe(
      (data) => {
        localStorage.setItem('access_token', JSON.stringify(data.access_token));
        this.LoginService.isAuthenticatedSubject.next(true);
  
        const tokenStr = localStorage.getItem('access_token');
  
        if (tokenStr) {
          const decoder: JwtDecoderService = new JwtDecoderService();
          const decodedToken = decoder.decodeToken(tokenStr.replace(/^"(.*)"$/, '$1')); // enlever les guillemets si JSON.stringify a été utilisé
  
          localStorage.setItem("languagePreference", decodedToken.languagePreference || '');
  
          if (decodedToken.roles.includes("ROLE_ADMIN")) {
            this.router.navigate(['/productsAdmin']);
          } else if (decodedToken.roles.includes("ROLE_CLIENT")) {
            this.router.navigate(['/productsClient']);
          } else {
            this.router.navigate(['/']); // fallback
          }
        } else {
          this.errorMessages = [{
            severity: 'warn',
            summary: 'Warning',
            detail: 'No token found. Please log in again.'
          }];
        }
      },
      (error) => {
        if (error.status === 403) {
          this.errorMessages = [{
            severity: 'error',
            summary: 'Error',
            detail: 'Wrong credentials. Try again'
          }];
        } else {
          this.errorMessages = [{
            severity: 'warn',
            summary: 'Warning',
            detail: 'Something went wrong. Please try again later'
          }];
        }
      }
    );
  }
  
  goBack() {
    this.router.navigate(['/']); // ex: /dashboard ou /products
  }
}
