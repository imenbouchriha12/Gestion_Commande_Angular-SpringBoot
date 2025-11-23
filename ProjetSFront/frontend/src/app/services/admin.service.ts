import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  URL="http://127.0.0.1:8082/api";

  constructor(private http:HttpClient) { }
  deleteUser(id: number): Observable<any> {
    if (this.hasToken()) {
      let token = localStorage.getItem("access_token");
      if (token) {
        token = token.replace(/^"(.*)"$/, '$1');
      }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.post(`${this.URL}/deleteUser/${id}`, null, { headers: headers });
    } else {
      return new Observable<any>();
    }
  }


   
//GET ALL USERS METHOD
  getAllUsers():Observable<any> {
    if (this.hasToken()) {
      var token = localStorage.getItem("access_token");
      if (token) {
        token = token.replace(/^"(.*)"$/, '$1');
      }
    const headers = new HttpHeaders({
      
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.URL+"/allUsers", { headers: headers });
    
    
  }
  else return new Observable<any>();
}


//GET CONNECTED USER METHOD

  getUser():Observable<any>{
    if(this.hasToken()){
      var token =localStorage.getItem("access_token");
      if(token){
        token = token.replace(/^"(.*)"$/, '$1');
      }
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })

      return this.http.get(this.URL+"/getConnecteduser", { headers: headers });
    }
      else return new Observable<any>();
  }
 

  getUserById(id :number):Observable<any>{
    if(this.hasToken()){
      var token =localStorage.getItem("access_token");
      if(token){
        token = token.replace(/^"(.*)"$/, '$1');
      }
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      return this.http.get(this.URL+"/getuser/"+id, { headers: headers });
    }
      else return new Observable<any>();
  }
  

  updateUser(updatedUser: User): Observable<any> {
    if (this.hasToken()) {
      var token = localStorage.getItem("access_token");
      if (token) {
        token = token.replace(/^"(.*)"$/, '$1');
      }
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.patch(this.URL + "/updateuser", updatedUser, { headers: headers });
    } else {
      return new Observable<any>();
    }
  }
    private hasToken() : boolean {
      return (!!localStorage.getItem('access_token')/* && !!localStorage.getItem('refresh_token')*/);
    }
    
 
    }


