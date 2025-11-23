import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandesService {
  constructor(private http:HttpClient) { }
    URL="http://127.0.0.1:8082/api";

  //AUTHENTICATION CHECK
  hasToken() {
    return (!!localStorage.getItem('access_token'));
  }


getConfirmedOrders(): Observable<any> {
  if (this.hasToken()) {
    let token = localStorage.getItem("access_token");
    if (token) {
      token = token.replace(/^"(.*)"$/, '$1'); // Supprime les guillemets
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get(`${this.URL}/orders`, { headers });
    } else {
      return new Observable<any>(); // Aucun token → aucun appel
    }
  } else {
    return new Observable<any>(); // Aucun token → aucun appel
  }
}

getOrderDetails(orderId: number): Observable<any> {
  if (this.hasToken()) {
    let token = localStorage.getItem("access_token");
    if (token) {
      token = token.replace(/^"(.*)"$/, '$1'); // Supprime les guillemets éventuels
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<any>(`${this.URL}/details/${orderId}`, { headers });
    }
  }
  // Aucun token ou non connecté : retourner une erreur ou observable vide
  return new Observable<any>((observer) => {
    observer.error('Utilisateur non authentifié ou token manquant.');
  });
}

}