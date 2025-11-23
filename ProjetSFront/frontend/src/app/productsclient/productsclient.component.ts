import { Component, OnInit } from '@angular/core';
import { Product } from '../model/Product';
import { ProductsService } from '../services/products.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartitemService } from '../services/cartitem.service';
import { CartItem } from '../model/CartItem';

@Component({
  selector: 'app-productsclient',
  templateUrl: './productsclient.component.html',
  styleUrls: ['./productsclient.component.scss']
})
export class ProductsclientComponent implements OnInit {
  productDialog: boolean = false;
  prod: Product = new Product();
  products!: Product[];
   cartItems: CartItem[] = [];
  product!: Product;
  imageSource: string = "../../assets/images/noprofil.jpg";
  selectedFile: File | null = null;
  selectedProducts!: Product[] | null;
  productImages: string[] = [];
  allSelected: boolean = false;
  submitted: boolean = false;
  statuses!: any[];
  filteredProducts: Product[] = [];
  searchQuery: string = ''; // Variable pour le texte de recherche
  constructor(private service: ProductsService, private login: LoginService, private router: Router, private cart: CartitemService) {}

  ngOnInit() {
this.service.getProducts().subscribe(
  (data: Product[]) => {
    this.products = data.filter((product: Product) => product && !product.deleted);
    this.filteredProducts = [...this.products]; // Initialiser les produits filtrés

    this.productImages = this.products.map(product => {
      return product.photoBase64 && product.descPhoto
        ? `${product.descPhoto},${product.photoBase64}`
        : "../../assets/images/noprofil.png";
    });
  },
  error => {
    console.error('Erreur lors de la récupération des produits:', error);
    this.products = [];
    this.productImages = [];
  }
);

  }

onSearch() {
  if (!this.searchQuery.trim()) {
    this.filteredProducts = [...this.products]; // Si la recherche est vide, afficher tous les produits
  } else {
    this.filteredProducts = this.products.filter(product =>
      (product.nom && product.nom.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
      (product.categorie && product.categorie.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
      (product.prix && product.prix.toString().includes(this.searchQuery))
    );
  }
}
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.product.photoBase64 = null;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSource = e.target.result;
        this.product.descPhoto = e.target.result.split(',')[0];
        this.product.photoBase64 = e.target.result.split(',')[1];
      };
      reader.readAsDataURL(file);
    } else {
      this.imageSource = "../../assets/images/noprofil.jpg";
    }
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

addToCart(product: Product): void {
  this.cart.addToCart(product.id).subscribe({
    next: () => Swal.fire('Ajouté', 'Produit ajouté au panier', 'success'),
    error: () => Swal.fire('Erreur', 'Échec de l\'ajout au panier', 'error')
  });
}




}
