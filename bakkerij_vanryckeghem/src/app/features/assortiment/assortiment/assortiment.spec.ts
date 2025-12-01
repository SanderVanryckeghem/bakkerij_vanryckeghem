import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Assortiment } from './assortiment';
import { ContentService } from '../../../shared/services';
import { SeoService } from '../../../core/services/seo.service';
import { ActivatedRoute } from '@angular/router';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { Product } from '../../../shared/models';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Assortiment', () => {
  let component: Assortiment;
  let fixture: ComponentFixture<Assortiment>;
  let contentService: jasmine.SpyObj<ContentService>;
  let seoService: jasmine.SpyObj<SeoService>;
  let activatedRoute: ActivatedRoute;

  const mockProducts: Product[] = [
    { id: 1, name: 'Wit Brood', description: 'Fresh white bread', category: 'Brood' },
    { id: 2, name: 'Croissant', description: 'Buttery croissant', category: 'Gebak' },
    { id: 3, name: 'Ontbijtkoek', description: 'Breakfast cake', category: 'Ontbijtkoeken' },
    { id: 4, name: 'Volkoren Brood', description: 'Whole wheat bread', category: 'Brood' }
  ];

  beforeEach(async () => {
    const contentServiceSpy = jasmine.createSpyObj('ContentService', [], {
      products: signal<Product[]>(mockProducts),
      bakeryInfo: signal(null),
      categories: signal([]),
      faqs: signal([]),
      openingHours: signal([])
    });

    const seoServiceSpy = jasmine.createSpyObj('SeoService', ['updateMetaTags', 'addStructuredData']);

    await TestBed.configureTestingModule({
      imports: [Assortiment],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ContentService, useValue: contentServiceSpy },
        { provide: SeoService, useValue: seoServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Assortiment);
    component = fixture.componentInstance;
    contentService = TestBed.inject(ContentService) as jasmine.SpyObj<ContentService>;
    seoService = TestBed.inject(SeoService) as jasmine.SpyObj<SeoService>;
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component initialization', () => {
    it('should initialize with selectedCategory as Alle', () => {
      expect(component.selectedCategory()).toBe('Alle');
    });

    it('should have products from content service', () => {
      expect(component.products()).toEqual(mockProducts);
    });

    it('should have categories defined', () => {
      expect(component.categories).toBeDefined();
      expect(component.categories.length).toBeGreaterThan(0);
    });

    it('should call seoService.updateMetaTags on init', () => {
      expect(seoService.updateMetaTags).toHaveBeenCalledWith({
        title: 'Ons Assortiment - Bakkerij Vanryckeghem',
        description: 'Ontdek ons ruim assortiment aan ambachtelijk brood, gebak en ontbijtkoeken. Dagvers gebakken met de beste ingrediënten.',
        keywords: 'assortiment, brood, gebak, ontbijtkoeken, vers gebakken, ambachtelijk',
        url: 'https://www.bakkerijvanryckeghem.be/assortiment'
      });
    });
  });

  describe('filteredProducts computed', () => {
    it('should return all products when selectedCategory is Alle', () => {
      component.selectedCategory.set('Alle');
      expect(component.filteredProducts()).toEqual(mockProducts);
    });

    it('should filter products by Brood category', () => {
      component.selectedCategory.set('Brood');
      const filtered = component.filteredProducts();
      expect(filtered.length).toBe(2);
      expect(filtered.every(p => p.category === 'Brood')).toBe(true);
    });

    it('should filter products by Gebak category', () => {
      component.selectedCategory.set('Gebak');
      const filtered = component.filteredProducts();
      expect(filtered.length).toBe(1);
      expect(filtered[0].category).toBe('Gebak');
    });

    it('should filter products by Ontbijtkoeken category', () => {
      component.selectedCategory.set('Ontbijtkoeken');
      const filtered = component.filteredProducts();
      expect(filtered.length).toBe(1);
      expect(filtered[0].category).toBe('Ontbijtkoeken');
    });

    it('should return empty array when no products match category', () => {
      contentService.products.set([
        { id: 1, name: 'Wit Brood', description: 'Fresh white bread', category: 'Brood' }
      ]);
      component.selectedCategory.set('Gebak');
      const filtered = component.filteredProducts();
      expect(filtered.length).toBe(0);
    });

    it('should react to products signal changes', () => {
      component.selectedCategory.set('Alle');
      expect(component.filteredProducts().length).toBe(4);

      const newProducts: Product[] = [
        { id: 5, name: 'New Product', description: 'New description', category: 'Brood' }
      ];
      contentService.products.set(newProducts);
      expect(component.filteredProducts().length).toBe(1);
    });
  });

  describe('selectCategory', () => {
    it('should set selectedCategory to provided category', () => {
      component.selectCategory('Brood');
      expect(component.selectedCategory()).toBe('Brood');
    });

    it('should update selectedCategory and trigger filteredProducts recomputation', () => {
      component.selectCategory('Gebak');
      expect(component.selectedCategory()).toBe('Gebak');
      expect(component.filteredProducts().length).toBe(1);
      expect(component.filteredProducts()[0].category).toBe('Gebak');
    });

    it('should handle switching between categories', () => {
      component.selectCategory('Brood');
      expect(component.filteredProducts().length).toBe(2);

      component.selectCategory('Ontbijtkoeken');
      expect(component.filteredProducts().length).toBe(1);

      component.selectCategory('Alle');
      expect(component.filteredProducts().length).toBe(4);
    });
  });

  describe('ngOnInit', () => {
    it('should update SEO meta tags with correct values', () => {
      expect(seoService.updateMetaTags).toHaveBeenCalledWith(
        jasmine.objectContaining({
          title: jasmine.stringContaining('Ons Assortiment'),
          description: jasmine.stringContaining('ambachtelijk brood'),
          url: 'https://www.bakkerijvanryckeghem.be/assortiment'
        })
      );
    });
  });

  describe('Query params handling', () => {
    it('should set selectedCategory from query params', async () => {
      const route = TestBed.inject(ActivatedRoute);
      (route as any).queryParams = of({ category: 'Brood' });

      const newFixture = TestBed.createComponent(Assortiment);
      newFixture.detectChanges();
      await newFixture.whenStable();

      expect(newFixture.componentInstance.selectedCategory()).toBe('Brood');
    });

    it('should ignore invalid category from query params', async () => {
      const route = TestBed.inject(ActivatedRoute);
      (route as any).queryParams = of({ category: 'InvalidCategory' });

      const newFixture = TestBed.createComponent(Assortiment);
      newFixture.detectChanges();
      await newFixture.whenStable();

      expect(newFixture.componentInstance.selectedCategory()).toBe('Alle');
    });
  });

  describe('DOM rendering', () => {
    it('should render hero component', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const hero = compiled.querySelector('app-hero');
      expect(hero).toBeTruthy();
    });
  });

  describe('Service injection', () => {
    it('should inject ContentService', () => {
      expect(contentService).toBeTruthy();
    });

    it('should inject SeoService', () => {
      expect(seoService).toBeTruthy();
    });

    it('should inject ActivatedRoute', () => {
      expect(activatedRoute).toBeTruthy();
    });
  });
});
