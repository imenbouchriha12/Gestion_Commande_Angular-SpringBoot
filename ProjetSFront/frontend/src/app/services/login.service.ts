import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../model/Auth';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL="http://127.0.0.1:8082/apii/auth";


isAuthenticatedSubject= new BehaviorSubject<boolean>(this.hasToken())

constructor(private http:HttpClient) { 

  }
  loginAtemptUser(auth:Auth):Observable<any>{
   
    return this.http.post<Auth>(this.URL+"/authenticate",auth);
  }

  register(val:any):Observable<any>{
    return this.http.post<User>(this.URL+"/register",val);
    
  }


  logout(token:string):Observable<any>{
    if(token){
      token = token.replace(/^"(.*)"$/, '$1');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    }) 

 
    return this.http.get(this.URL + "/logout", { headers: headers });  }
    private hasToken() : boolean {
      return (!!localStorage.getItem('access_token') && !!localStorage.getItem('refresh_token'));
    }

    getRegisterAttemptData(token:string):Observable<any>{
      return this.http.get(this.URL + "/registration-data/"+token);

    }
    getProductss(): Observable<any> {
    return this.http.get(this.URL + "/Productss");
  
}


    registerClient(val:any,token:any): Observable<any> {
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      return this.http.post(this.URL + "/register-agent", val, { headers: headers });

    }
 

 
}
