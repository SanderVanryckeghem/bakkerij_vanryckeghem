export type ProductCategory = 'Brood' | 'Gebak' | 'Ontbijtkoeken';

export interface Product {
  id: number;
  name: string;
  description: string;
  category: ProductCategory;
  imageUrl?: string;
  price?: number;
  isAvailable?: boolean;
}
