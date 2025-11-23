import { Component, OnInit } from '@angular/core';
import { CartitemService } from '../services/cartitem.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { CommandesService } from '../services/commandes.service';

@Component({
  selector: 'app-commandesadmin',
  templateUrl: './commandesadmin.component.html',
  styleUrls: ['./commandesadmin.component.scss']
})
export class CommandesadminComponent implements OnInit {

  orders: any[] = []; // Liste des commandes

  constructor(
    private cartService: CartitemService,
    private login: LoginService,
    private router: Router,
    private orderService: CommandesService
  ) {}

  ngOnInit(): void {
    this.loadOrders(); // Chargement des commandes à l'initialisation
  }

  loadOrders(): void {
    // Appel pour récupérer les commandes confirmées
    this.orderService.getConfirmedOrders().subscribe({
      next: (data) => this.orders = data, // Affecte les données récupérées
      error: (err) => console.error('Erreur lors du chargement des commandes :', err) // En cas d'erreur
    });
  }

  voirDetailsCommande(orderId: number): void {
    if (orderId) {
      // Vérifier que l'ID est valide avant de naviguer
      console.log(`Navigation vers la commande avec ID : ${orderId}`);
      this.router.navigate(['/order-details', orderId]); // Rediriger vers le détail de la commande
    } else {
      console.error('L\'ID de la commande est indéfini ou nul.');
    }
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
