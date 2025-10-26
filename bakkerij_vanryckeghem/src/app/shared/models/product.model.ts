export type ProductCategory = 'Brood' | 'Gebak' | 'Specialiteiten';

export interface Product {
  id: number;
  name: string;
  description: string;
  category: ProductCategory;
  imageUrl?: string;
  price?: number;
  isAvailable?: boolean;
}