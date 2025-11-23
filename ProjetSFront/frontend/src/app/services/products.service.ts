import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  URL="http://127.0.0.1:8082/api";

  //AUTHENTICATION CHECK
  hasToken() {
    return (!!localStorage.getItem('access_token'));
  }


  //DELETE SUBSCRIPTION PLAN METHOD
  deleteProduct(id: number):Observable<any>{
    if (this.hasToken()) {
      var token = localStorage.getItem("access_token");
      if (token) {
        token = token.replace(/^"(.*)"$/, '$1');
      }
    const headers = new HttpHeaders({
      
      'Authorization': `Bearer ${token}`
    });

      const options = {
        headers: headers,
        withCredentials: true ,
       
      };
    return this.http.delete(this.URL+"/deleteProduct/"+id,options);
  }
  return new Observable<any>();
}
 

deleteProducts(productIds: number[]): Observable<any> {
  const token = localStorage.getItem('access_token')?.replace(/^"(.*)"$/, '$1');

 if (this.hasToken()) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.request('DELETE', this.URL + '/deleteproducts', {
    headers: headers,
    body: productIds,
    withCredentials: true
  });
    }
      return new Observable<any>();

}


    //UPDATE  SUBSCRIPTION PLAN METHOD

  updateProduct(product: Product) :Observable<any>{
    if (this.hasToken()) {
      var token = localStorage.getItem("access_token");
      if (token) {
        token = token.replace(/^"(.*)"$/, '$1');
      }
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.put(this.URL + "/updateProduct", product, { headers: headers });
    } else {
      return new Observable<any>();
    }
  }

  //CREATE NEW SUBSCRIPTION PLAN METHOD
  createProduct(product: Product) :Observable<any>{
    if (this.hasToken()) {
      var token = localStorage.getItem("access_token");
      if (token) {
        token = token.replace(/^"(.*)"$/, '$1');
      }
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.post(this.URL + "/addProduct", product, { headers: headers });
    } else {
      return new Observable<any>();
    }
  }

getProducts(): Observable<any> {
  if (this.hasToken()) {
    let token = localStorage.getItem("access_token");
    if (token) {
      token = token.replace(/^"(.*)"$/, '$1');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.URL + "/Products", { headers });
  } else {
    return new Observable<any>();
  }
}




  



 


  
  constructor(private http:HttpClient) { }
}
