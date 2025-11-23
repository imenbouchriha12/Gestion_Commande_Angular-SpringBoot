import { Component, OnInit } from '@angular/core';
import { Product } from '../model/Product';
import { ProductsService } from '../services/products.service';
import Swal from 'sweetalert2'; // SweetAlert2 reste utile pour des notifications élégantes
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent implements OnInit {
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
  constructor(private service: ProductsService, private login: LoginService, private router: Router) {}
loadProducts() {
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

ngOnInit() {
  this.loadProducts();
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

  openNew() {
    this.product = new Product();
    this.submitted = false;
    this.productDialog = true;
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


updateSelectedProducts() {
  this.selectedProducts = this.products.filter(p => p.selected);
}

deleteSelectedProducts() {
  if (!this.selectedProducts || this.selectedProducts.length === 0) {
    Swal.fire('Aucun produit sélectionné', 'Veuillez sélectionner des produits à supprimer.', 'warning');
    return;
  }

  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: 'Les produits sélectionnés seront définitivement supprimés.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      const productIds = this.selectedProducts!.map(product => product.id);

      this.service.deleteProducts(productIds).subscribe({
        next: () => {
          // Mise à jour de la liste des produits localement
          this.products = this.products.filter(product => !productIds.includes(product.id));
          this.selectedProducts = [];

          Swal.fire('Supprimé !', 'Les produits ont été supprimés avec succès.', 'success');
          this.loadProducts();

        },
        error: (err) => {
          console.error(err);
          Swal.fire('Erreur', 'La suppression des produits a échoué.', 'error');
        }
      });
    }
  });
}



  editProducts(product: Product) {
    this.product = { ...product }; 
    this.productDialog = true;
  }
  toggleSelectAll() {
    if (this.products && this.products.length) {
      this.products.forEach(p => (p as any).selected = this.allSelected);
      this.selectedProducts = this.allSelected ? [...this.products] : [];
    }
  }
deleteProduct(product: Product) {
  Swal.fire({
    title: `Are you sure you want to delete "${product.nom}"?`,
    text: "This action cannot be undone!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.service.deleteProduct(product.id).subscribe(
        () => {
          this.products = this.products.filter(p => p.id !== product.id);
          Swal.fire('Deleted!', 'Product has been deleted.', 'success');
          this.loadProducts();

        },
        (error) => {
          Swal.fire('Error', 'Failed to delete the product. Please try again later.', 'error');
        }
      );
    } else {
      Swal.fire('Cancelled', 'The product was not deleted.', 'info');
    }
  });
}


  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.nom?.trim()) {
      if (this.product.id) {
        // Update existing product
        this.service.updateProduct(this.product).subscribe(
          (data) => {
            Swal.fire('Successful', 'Product Updated', 'success');
            this.loadProducts();
          },
          (error) => Swal.fire('Error', 'Failed to update the Product. Please try again later.', 'error')
        );
      } else {
        // Create new product
        this.service.createProduct(this.product).subscribe(
          (newProduct) => {
            this.products.push(newProduct.body);
            Swal.fire('Successful', 'Product Created', 'success');
            this.loadProducts();

          },
          (error) => Swal.fire('Error', 'Failed to create the Product. Please try again later.', 'error')
        );
      }

      this.productDialog = false;
      this.product = new Product();
    } else {
      Swal.fire('Warning', 'Please provide a valid product name.', 'warning');
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
}
