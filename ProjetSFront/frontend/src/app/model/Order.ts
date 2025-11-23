import { OrderItem } from "./OrderItem";
import { User } from "./User";

export class Order {
  id!: number;
  user!: User;             // Un objet User représentant l'utilisateur lié
  orderDate!: string;      // Utiliser `string` pour stocker la date en format ISO
  status!: string;         // ex: PENDING, CONFIRMED, SHIPPED...
  items!: OrderItem[];
  total_price!:number;
}