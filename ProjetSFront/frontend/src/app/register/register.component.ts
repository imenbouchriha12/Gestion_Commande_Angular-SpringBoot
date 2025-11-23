import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Password } from '../model/Password';
import { User } from '../model/User';
import Swal from 'sweetalert2';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user : User=new User() ;
  display: string = 'display: none;';
  message: string | undefined; 
  message1: string | undefined; 
  passwordModel:Password=new Password();
  password: string = '';
  passwordverif:string='';
  passwordType: string = 'password';
  imageSource: string = '../../assets/images/noprofil.jpg';
  selectedFile: File | null = null;
  regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  registerClient!: FormGroup;

  constructor(private router: Router, private loginService: LoginService,private route:ActivatedRoute,private formBuilder: FormBuilder) {     
}
token!:string;
  ngOnInit(): void {
    this.registerClient = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      telephone: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/)]],
      passwordverif: ['', [Validators.required]], // Assurez-vous que 'passwordverif' est ici
      datebirth: ['', Validators.required]
    });
  
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
  
  register(val: any) { 
 if(val.password==val.passwordverif && val.agpassword==val.agpasswordverif){
      const data = {
        firstname: val.firstname,
        lastname: val.lastname,
        address: val.address,
        email: val.email,
        password: val.password,
        datebirth: val.datebirth,
        telephone: val.telephone,
        role: "CLIENT"
      };
      

    this.loginService.register(data) 
      .subscribe(
        (data) => {
          window.localStorage.setItem('access_token', JSON.stringify(data.access_token));
          window.localStorage.setItem('refresh_token', JSON.stringify(data.refresh_token));
          this.router.navigate(['/productsClient']);
        },
       );
 }
return;

      }
    
 
}