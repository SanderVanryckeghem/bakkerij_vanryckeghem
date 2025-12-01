import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { Product, BakeryInfo, OpeningHours, FAQItem, Category, PopupConfig } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private http = inject(HttpClient);

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  faqs = signal<FAQItem[]>([]);
  bakeryInfo = signal<BakeryInfo | null>(null);
  openingHours = signal<OpeningHours[]>([]);
  popupConfig = signal<PopupConfig | null>(null);

  loadingError = signal<string | null>(null);

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    this.http.get<Product[]>('assets/data/products.json').pipe(
      catchError(error => {
        console.error('Failed to load products:', error);
        this.loadingError.set('Er is een probleem bij het laden van de producten.');
        return of([]);
      })
    ).subscribe(data => {
      this.products.set(data);
    });

    this.http.get<Category[]>('assets/data/categories.json').pipe(
      catchError(error => {
        console.error('Failed to load categories:', error);
        this.loadingError.set('Er is een probleem bij het laden van de categorieën.');
        return of([]);
      })
    ).subscribe(data => {
      this.categories.set(data);
    });

    this.http.get<FAQItem[]>('assets/data/faq.json').pipe(
      catchError(error => {
        console.error('Failed to load FAQs:', error);
        this.loadingError.set('Er is een probleem bij het laden van de veelgestelde vragen.');
        return of([]);
      })
    ).subscribe(data => {
      this.faqs.set(data);
    });

    this.http.get<OpeningHours[]>('assets/data/opening-hours.json').pipe(
      catchError(error => {
        console.error('Failed to load opening hours:', error);
        this.loadingError.set('Er is een probleem bij het laden van de openingsuren.');
        return of([]);
      })
    ).subscribe(data => {
      this.openingHours.set(data);
      this.loadBakeryInfo();
    });

    this.http.get<PopupConfig>('assets/data/popup.json').pipe(
      catchError(error => {
        console.error('Failed to load popup config:', error);
        return of(null);
      })
    ).subscribe(data => {
      this.popupConfig.set(data);
    });
  }

  private loadBakeryInfo(): void {
    this.http.get<BakeryInfo>('assets/data/bakery-info.json').pipe(
      catchError(error => {
        console.error('Failed to load bakery info:', error);
        this.loadingError.set('Er is een probleem bij het laden van de bakkerij informatie.');
        return of(null);
      })
    ).subscribe(data => {
      if (data) {
        this.bakeryInfo.set({ ...data, openingHours: this.openingHours() });
      }
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

  getPopupConfig(): PopupConfig | null {
    return this.popupConfig();
  }
}
