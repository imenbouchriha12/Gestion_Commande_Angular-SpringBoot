import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../model/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartitemService {

  constructor(private http:HttpClient) { }
    URL="http://127.0.0.1:8082/api";

  //AUTHENTICATION CHECK
  hasToken() {
    return (!!localStorage.getItem('access_token'));
  }
addToCart(productId: number): Observable<any> {
  if (this.hasToken()) {
    let token = localStorage.getItem("access_token");
    if (token) {
      token = token.replace(/^"(.*)"$/, '$1');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const params = `?productId=${productId}&quantity=1`;

    return this.http.post(`${this.URL}/add${params}`, {}, { headers });
  } else {
    return new Observable<any>();
  }
}



  getCart(): Observable<CartItem[]> {
 if (this.hasToken()) {
      let token = localStorage.getItem("access_token");
      if (token) {
        token = token.replace(/^"(.*)"$/, '$1'); // Supprime les guillemets
      }  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });    return this.http.get<CartItem[]>(this.URL, { headers });
  }else {
      return new Observable<any>(); // Aucun token → aucun appel
    }
}

removeFromCart(itemId: number): Observable<void> {
  if (this.hasToken()) {
    let token = localStorage.getItem("access_token");
    if (token) {
      token = token.replace(/^"(.*)"$/, '$1'); // Supprimer les guillemets si nécessaire
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Vérifiez l'URL de l'API, assurez-vous que '/api' est bien ajouté si nécessaire
    return this.http.delete<void>(`${this.URL}/remove/${itemId}`, { headers });
  } else {
    return new Observable<any>(); // Aucun token → aucun appel
  }
}


clearCart(): Observable<void> {
  const token = localStorage.getItem("access_token");
  
  if (token) {
    const cleanedToken = token.replace(/^"(.*)"$/, '$1'); // Supprimer les guillemets si nécessaire

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${cleanedToken}`
    });

    return this.http.delete<void>(`${this.URL}/clear`, { headers });
  } else {
    return new Observable<void>(); // Aucun token → aucun appel
  }
}

confirmCart(): Observable<any> {
  const token = localStorage.getItem("access_token");

  if (token) {
    const cleanedToken = token.replace(/^"(.*)"$/, '$1'); // Supprimer les guillemets si présents

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${cleanedToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.URL}/confirm`, {}, { headers });
  } else {
    return new Observable<any>(); // ou throwError comme alternative
  }
}




}
