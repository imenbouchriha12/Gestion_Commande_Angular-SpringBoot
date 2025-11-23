import { Component, OnInit } from '@angular/core';
import { CartitemService } from '../services/cartitem.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { CommandesService } from '../services/commandes.service';

@Component({
  selector: 'app-commandesclient',
  templateUrl: './commandesclient.component.html',
  styleUrls: ['./commandesclient.component.scss']
})
export class CommandesclientComponent {
  constructor(private cartService: CartitemService, private login: LoginService, private router: Router, private orderService: CommandesService) {}









  logout() {
  const token = localStorage.getItem('access_token');

  const clearSessionAndRedirect = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/']);
  };

  if (token) {
    this.login.logout(token).subscribe({
      next: () => clearSessionAndRedirect(),
      error: () => clearSessionAndRedirect()
    });
  } else {
    this.router.navigate(['/']);
  }
}
}
