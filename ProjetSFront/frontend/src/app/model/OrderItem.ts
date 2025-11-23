import { Product } from "./Product";

export class OrderItem {
  id!: number;
  product!: Product;       // Un objet Product représentant le produit
  quantity!: number;
  price!: number;
}