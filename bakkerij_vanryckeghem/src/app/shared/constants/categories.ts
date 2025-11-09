import { ProductCategory } from '../models';

export const PRODUCT_CATEGORIES: ProductCategory[] = ['Brood', 'Gebak', 'Ontbijtkoeken'];

export type CategoryFilter = 'Alle' | ProductCategory;

export const CATEGORY_FILTERS: CategoryFilter[] = ['Alle', ...PRODUCT_CATEGORIES];
