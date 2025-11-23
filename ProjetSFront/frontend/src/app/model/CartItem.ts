export class CartItem {
  id!: number;
  product!: {
    id: number;
    nom: string;
    description: string;
    prix: number;
    stock: number;
    photoBase64?: string;
    descPhoto?: string;
  };
  quantity!: number;
  status!: string;
  totalPrice!:number;
}
