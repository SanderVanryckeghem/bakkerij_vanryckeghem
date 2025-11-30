import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, BakeryInfo, OpeningHours, FAQItem, Category } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  faqs = signal<FAQItem[]>([]);
  bakeryInfo = signal<BakeryInfo | null>(null);
  openingHours = signal<OpeningHours[]>([]);

  constructor(private http: HttpClient) {
    this.loadData();
  }

  private loadData(): void {
    this.http.get<Product[]>('/assets/data/products.json').subscribe(data => {
      this.products.set(data);
    });

    this.http.get<Category[]>('/assets/data/categories.json').subscribe(data => {
      this.categories.set(data);
    });

    this.http.get<FAQItem[]>('/assets/data/faq.json').subscribe(data => {
      this.faqs.set(data);
    });

    this.http.get<OpeningHours[]>('/assets/data/opening-hours.json').subscribe(data => {
      this.openingHours.set(data);
      this.loadBakeryInfo();
    });
  }

  private loadBakeryInfo(): void {
    this.http.get<BakeryInfo>('/assets/data/bakery-info.json').subscribe(data => {
      this.bakeryInfo.set({ ...data, openingHours: this.openingHours() });
    });
  }

  getProducts(): Product[] {
    return this.products();
  }

  getProductById(id: number): Product | undefined {
    return this.products().find(p => p.id === id);
  }

  getProductsByCategory(category: string): Product[] {
    return this.products().filter(p => p.category === category);
  }

  getBakeryInfo(): BakeryInfo | null {
    return this.bakeryInfo();
  }

  getOpeningHours(): OpeningHours[] {
    return this.openingHours();
  }

  getFAQs(): FAQItem[] {
    return this.faqs();
  }

  getCategories(): Category[] {
    return this.categories();
  }
}
