import { Component, OnInit } from '@angular/core';
import { CommandesService } from '../services/commandes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-detailscommande',
  templateUrl: './detailscommande.component.html',
  styleUrls: ['./detailscommande.component.scss']
})
export class DetailscommandeComponent implements OnInit {
  order: any;

  constructor(
    private route: ActivatedRoute,
    private orderService: CommandesService,
    private router: Router,
    private login: LoginService
  ) {}

  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getOrderDetails(orderId).subscribe({
      next: (data) => this.order = data,
      error: (err) => console.error('Erreur lors de la récupération de la commande :', err)
    });
  }
    logout(): void {
    const token = localStorage.getItem('access_token');
    const clearSessionAndRedirect = () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      this.router.navigate(['/']);
    };

    if (token) {
      this.login.logout(token).subscribe({
        next: () => clearSessionAndRedirect(), // Si déconnexion réussie
        error: () => clearSessionAndRedirect() // Si erreur de déconnexion
      });
    } else {
      this.router.navigate(['/']); // Si aucun token
    }
  }
}
