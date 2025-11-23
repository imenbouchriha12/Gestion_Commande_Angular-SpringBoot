import { Component } from '@angular/core';
import { Product } from '../model/Product';
import { ProductsService } from '../services/products.service';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    productDialog: boolean = false;
    prod: Product = new Product();
    products!: Product[];
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
    constructor(private service: ProductsService, private login: LoginService) {}
  ngOnInit() {
this.login.getProductss().subscribe(
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
}
