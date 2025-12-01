import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { ContentService } from '../../../shared/services';
import { SeoService } from '../../../core/services/seo.service';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { BakeryInfo, FAQItem, Category, PopupConfig } from '../../../shared/models';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let contentService: jasmine.SpyObj<ContentService>;
  let seoService: jasmine.SpyObj<SeoService>;

  const mockBakeryInfo: BakeryInfo = {
    name: 'Bakkerij Van Ryckeghem',
    description: 'Test description',
    contact: {
      phone: '056 71 23 45',
      email: 'info@bakkerijvanryckeghem.be',
      address: {
        street: 'Overleiestraat',
        number: '38',
        city: 'Harelbeke',
        zip: '8530'
      }
    },
    openingHours: []
  };

  const mockCategories: Category[] = [
    { title: 'Brood', description: 'Fresh bread', routerLink: '/assortiment', queryParams: { category: 'Brood' } },
    { title: 'Gebak', description: 'Delicious pastries', routerLink: '/assortiment', queryParams: { category: 'Gebak' } }
  ];

  const mockFaqs: FAQItem[] = [
    { question: 'What are your hours?', answer: 'We are open daily' },
    { question: 'Do you deliver?', answer: 'Yes, we do' }
  ];

  beforeEach(async () => {
    const contentServiceSpy = jasmine.createSpyObj('ContentService', [], {
      bakeryInfo: signal<BakeryInfo | null>(mockBakeryInfo),
      categories: signal<Category[]>(mockCategories),
      faqs: signal<FAQItem[]>(mockFaqs),
      products: signal([]),
      openingHours: signal([]),
      popupConfig: signal<PopupConfig | null>(null)
    });

    const seoServiceSpy = jasmine.createSpyObj('SeoService', ['updateMetaTags', 'addStructuredData']);

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ContentService, useValue: contentServiceSpy },
        { provide: SeoService, useValue: seoServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    contentService = TestBed.inject(ContentService) as jasmine.SpyObj<ContentService>;
    seoService = TestBed.inject(SeoService) as jasmine.SpyObj<SeoService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component initialization', () => {
    it('should initialize with openFaqIndex as null', () => {
      expect(component.openFaqIndex()).toBeNull();
    });

    it('should have bakery info from content service', () => {
      expect(component.bakeryInfo()).toEqual(mockBakeryInfo);
    });

    it('should have categories from content service', () => {
      expect(component.categories()).toEqual(mockCategories);
    });

    it('should have faqs from content service', () => {
      expect(component.faqs()).toEqual(mockFaqs);
    });

    it('should call seoService.updateMetaTags on init', () => {
      expect(seoService.updateMetaTags).toHaveBeenCalledWith({
        title: 'Bakkerij Vanryckeghem - Ambachtelijk Brood & Gebak in Harelbeke',
        description: 'Dagvers ambachtelijk brood, gebak en ontbijtkoeken uit Harelbeke. Familietraditie sinds de jaren \'40. Bezoek ons in de Overleiestraat 38.',
        keywords: 'bakkerij Harelbeke, ambachtelijk brood, vers gebak, ontbijtkoeken, taarten op bestelling',
        url: 'https://www.bakkerijvanryckeghem.be'
      });
    });
  });

  describe('toggleFaq', () => {
    it('should open FAQ when currently closed', () => {
      expect(component.openFaqIndex()).toBeNull();
      component.toggleFaq(0);
      expect(component.openFaqIndex()).toBe(0);
    });

    it('should close FAQ when currently open', () => {
      component.openFaqIndex.set(0);
      expect(component.openFaqIndex()).toBe(0);
      component.toggleFaq(0);
      expect(component.openFaqIndex()).toBeNull();
    });

    it('should switch to different FAQ', () => {
      component.openFaqIndex.set(0);
      component.toggleFaq(1);
      expect(component.openFaqIndex()).toBe(1);
    });

    it('should handle multiple toggles', () => {
      component.toggleFaq(0);
      expect(component.openFaqIndex()).toBe(0);
      component.toggleFaq(0);
      expect(component.openFaqIndex()).toBeNull();
      component.toggleFaq(1);
      expect(component.openFaqIndex()).toBe(1);
    });
  });

  describe('isFaqOpen', () => {
    it('should return true when FAQ is open', () => {
      component.openFaqIndex.set(0);
      expect(component.isFaqOpen(0)).toBe(true);
    });

    it('should return false when FAQ is closed', () => {
      component.openFaqIndex.set(null);
      expect(component.isFaqOpen(0)).toBe(false);
    });

    it('should return false for different FAQ index', () => {
      component.openFaqIndex.set(0);
      expect(component.isFaqOpen(1)).toBe(false);
    });

    it('should handle multiple FAQs correctly', () => {
      component.openFaqIndex.set(1);
      expect(component.isFaqOpen(0)).toBe(false);
      expect(component.isFaqOpen(1)).toBe(true);
      expect(component.isFaqOpen(2)).toBe(false);
    });
  });

  describe('ngOnInit', () => {
    it('should update SEO meta tags with correct values', () => {
      expect(seoService.updateMetaTags).toHaveBeenCalledWith(
        jasmine.objectContaining({
          title: jasmine.stringContaining('Bakkerij Vanryckeghem'),
          description: jasmine.stringContaining('Dagvers ambachtelijk brood'),
          keywords: jasmine.stringContaining('bakkerij Harelbeke'),
          url: 'https://www.bakkerijvanryckeghem.be'
        })
      );
    });
  });

  describe('DOM rendering', () => {
    it('should render hero component', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const hero = compiled.querySelector('app-hero');
      expect(hero).toBeTruthy();
    });

    it('should render category cards for each category', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const categoryCards = compiled.querySelectorAll('app-category-card');
      expect(categoryCards.length).toBeGreaterThan(0);
    });
  });

  describe('Signal reactivity', () => {
    it('should update bakery info when content service signal changes', () => {
      const newBakeryInfo: BakeryInfo = {
        ...mockBakeryInfo,
        name: 'Updated Bakkerij'
      };
      contentService.bakeryInfo.set(newBakeryInfo);
      fixture.detectChanges();
      expect(component.bakeryInfo()).toEqual(newBakeryInfo);
    });

    it('should update categories when content service signal changes', () => {
      const newCategories: Category[] = [
        { title: 'Ontbijtkoeken', description: 'Breakfast cakes', routerLink: '/assortiment', queryParams: { category: 'Ontbijtkoeken' } }
      ];
      contentService.categories.set(newCategories);
      fixture.detectChanges();
      expect(component.categories()).toEqual(newCategories);
    });

    it('should update faqs when content service signal changes', () => {
      const newFaqs: FAQItem[] = [
        { question: 'New question?', answer: 'New answer' }
      ];
      contentService.faqs.set(newFaqs);
      fixture.detectChanges();
      expect(component.faqs()).toEqual(newFaqs);
    });

    it('should react to openFaqIndex signal changes', () => {
      expect(component.openFaqIndex()).toBeNull();
      component.openFaqIndex.set(2);
      fixture.detectChanges();
      expect(component.openFaqIndex()).toBe(2);
      expect(component.isFaqOpen(2)).toBe(true);
    });
  });

  describe('Service injection', () => {
    it('should inject ContentService', () => {
      expect(contentService).toBeTruthy();
    });

    it('should inject SeoService', () => {
      expect(seoService).toBeTruthy();
    });
  });
});
