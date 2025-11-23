import { Component, OnInit } from '@angular/core';
import { CartitemService } from '../services/cartitem.service';
import { CartItem } from '../model/CartItem';
import Swal from 'sweetalert2'; // SweetAlert2 reste utile pour des notifications élégantes
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent  implements OnInit {
  cartItems: CartItem[] = [];
cartImages: string[] = [];

  constructor(private cartService: CartitemService, private login: LoginService, private router: Router) {}

  ngOnInit(): void {
  this.cartService.getCart().subscribe({
    next: (items) => {
      this.cartItems = items;

      // Génère les images à afficher
      this.cartImages = this.cartItems.map(item => {
        if (item.product?.photoBase64 && item.product?.descPhoto) {
          return `${item.product.descPhoto},${item.product.photoBase64}`;
        }
        return '../../assets/images/noprofil.png';
      });
    },
    error: (err) => {
      console.error('Erreur lors de la récupération du panier :', err);
      this.cartItems = [];
      this.cartImages = [];
    }
  });
}

getTotalCartPrice(): number {
  return this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
}

  removeFromCart(itemId: number): void {
    this.cartService.removeFromCart(itemId).subscribe({
      next: () => {
        // Mise à jour de l'interface après la suppression
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
        Swal.fire('Supprimé', 'Produit supprimé du panier', 'success');
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du produit :', err);
        Swal.fire('Erreur', 'Échec de la suppression du produit', 'error');
      }
    });
  }

  // Méthode pour vider le panier
  clearCart(): void {
    this.cartService.clearCart().subscribe(
      () => {
        // Afficher un message de succès avec SweetAlert2
        Swal.fire({
          title: 'Succès!',
          text: 'Le panier a été vidé avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
         this.ngOnInit();
      },
      (error) => {
        // Afficher un message d'erreur avec SweetAlert2
        console.error('Erreur lors du vidage du panier:', error);
        Swal.fire({
          title: 'Erreur!',
          text: 'Une erreur est survenue lors du vidage du panier.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }


confirmCart(): void {
  Swal.fire({
    title: 'Confirmation',
    text: 'Voulez-vous vraiment confirmer votre panier ?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Oui, confirmer',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.cartService.confirmCart().subscribe({
        next: (response) => {
          console.log('Réponse succès :', response);
          Swal.fire('Succès', 'Commande confirmée avec succès !', 'success');
          this.ngOnInit(); // recharge le panier
        },
        error: (error) => {
          console.error('Erreur confirmation :', error);
          const message = error?.error?.message || 'Échec de la confirmation.';
          Swal.fire('Erreur', message, 'error');
        }
      });
    }
  });
}

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