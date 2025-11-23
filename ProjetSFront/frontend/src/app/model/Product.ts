export class Product {
    id!: number;
    nom!: string;
    description!: string;
    prix!: number;  // Changed to number for price
    stock!: number; // Changed to number for stock
    photoBase64!: string | null;
    photo?: string; // Marked as optional in case it's not always set
    deleted:boolean = false;
    descPhoto!:string;
    selected?: boolean;
    categorie!:string;



}
