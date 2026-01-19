import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Bestellen } from './bestellen';
import { SeoService } from '../../../core/services/seo.service';
import { provideRouter } from '@angular/router';

describe('Bestellen', () => {
  let component: Bestellen;
  let fixture: ComponentFixture<Bestellen>;
  let seoService: jasmine.SpyObj<SeoService>;

  beforeEach(async () => {
    const seoServiceSpy = jasmine.createSpyObj('SeoService', ['updateMetaTags', 'addStructuredData']);

    await TestBed.configureTestingModule({
      imports: [Bestellen],
      providers: [
        provideRouter([]),
        { provide: SeoService, useValue: seoServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Bestellen);
    component = fixture.componentInstance;
    seoService = TestBed.inject(SeoService) as jasmine.SpyObj<SeoService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component initialization', () => {
    it('should have ordering methods defined', () => {
      expect(component.orderingMethods).toBeDefined();
      expect(component.orderingMethods.length).toBe(2);
    });

    it('should call seoService.updateMetaTags on init', () => {
      expect(seoService.updateMetaTags).toHaveBeenCalledWith({
        title: 'Bestellen - Bakkerij Vanryckeghem | Telefonisch of in de winkel',
        description: 'Bestel uw vers brood en gebak bij Bakkerij Vanryckeghem. Telefonisch op 056 71 23 45 of kom langs in onze winkel.',
        keywords: 'bestellen, brood bestellen, gebak bestellen, telefonisch, winkel',
        url: 'https://www.bakkerijvanryckeghem.be/bestellen'
      });
    });
  });

  describe('Ordering methods', () => {
    it('should have phone ordering method', () => {
      const phoneMethod = component.orderingMethods.find(m => m.title === 'Telefonisch');
      expect(phoneMethod).toBeDefined();
      expect(phoneMethod?.description).toContain('Bel ons op');
      expect(phoneMethod?.actionText).toBe('056 71 23 45');
      expect(phoneMethod?.actionLink).toBe('tel:056712345');
    });

    it('should have in-store ordering method', () => {
      const storeMethod = component.orderingMethods.find(m => m.title === 'In de Winkel');
      expect(storeMethod).toBeDefined();
      expect(storeMethod?.description).toContain('Kom gerust langs');
      expect(storeMethod?.actionText).toBe('Bekijk op kaart');
    });

    it('should have icon for each ordering method', () => {
      component.orderingMethods.forEach(method => {
        expect(method.icon).toBeDefined();
        expect(method.icon.length).toBeGreaterThan(0);
      });
    });

    it('should have title and description for each ordering method', () => {
      component.orderingMethods.forEach(method => {
        expect(method.title).toBeDefined();
        expect(method.title.length).toBeGreaterThan(0);
        expect(method.description).toBeDefined();
        expect(method.description.length).toBeGreaterThan(0);
      });
    });

    it('should have store address details', () => {
      const storeMethod = component.orderingMethods.find(m => m.title === 'In de Winkel');
      expect(storeMethod?.details).toBeDefined();
      expect(storeMethod?.details?.length).toBe(2);
      expect(storeMethod?.details).toContain('Overleiestraat 38');
      expect(storeMethod?.details).toContain('8530 Harelbeke');
    });

    it('should have Google Maps link for store location', () => {
      const storeMethod = component.orderingMethods.find(m => m.title === 'In de Winkel');
      expect(storeMethod?.actionLink).toContain('maps.google.com');
      expect(storeMethod?.actionLink).toContain('Overleiestraat+38+8530+Harelbeke');
    });
  });

  describe('ngOnInit', () => {
    it('should update SEO meta tags with correct values', () => {
      expect(seoService.updateMetaTags).toHaveBeenCalledWith(
        jasmine.objectContaining({
          title: jasmine.stringContaining('Bestellen'),
          description: jasmine.stringContaining('Bestel uw vers brood'),
          keywords: jasmine.stringContaining('bestellen'),
          url: 'https://www.bakkerijvanryckeghem.be/bestellen'
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

    it('should display ordering methods', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Telefonisch');
      expect(compiled.textContent).toContain('In de Winkel');
    });

    it('should display phone number', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('056 71 23 45');
    });

    it('should display store address', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Overleiestraat 38');
      expect(compiled.textContent).toContain('8530 Harelbeke');
    });
  });

  describe('Service injection', () => {
    it('should inject SeoService', () => {
      expect(seoService).toBeTruthy();
    });
  });

  describe('OrderingMethod interface', () => {
    it('should have correct structure for each ordering method', () => {
      component.orderingMethods.forEach(method => {
        expect(method.title).toBeDefined();
        expect(method.description).toBeDefined();
        expect(method.icon).toBeDefined();
        expect(typeof method.title).toBe('string');
        expect(typeof method.description).toBe('string');
        expect(typeof method.icon).toBe('string');
      });
    });

    it('should have optional actionText and actionLink', () => {
      component.orderingMethods.forEach(method => {
        if (method.actionText) {
          expect(typeof method.actionText).toBe('string');
        }
        if (method.actionLink) {
          expect(typeof method.actionLink).toBe('string');
        }
      });
    });

    it('should have optional details array', () => {
      const storeMethod = component.orderingMethods.find(m => m.title === 'In de Winkel');
      if (storeMethod?.details) {
        expect(Array.isArray(storeMethod.details)).toBe(true);
        storeMethod.details.forEach(detail => {
          expect(typeof detail).toBe('string');
        });
      }
    });
  });

  describe('Contact information accuracy', () => {
    it('should have correct phone number format', () => {
      const phoneMethod = component.orderingMethods.find(m => m.title === 'Telefonisch');
      expect(phoneMethod?.actionText).toBe('056 71 23 45');
    });

    it('should have tel link without spaces', () => {
      const phoneMethod = component.orderingMethods.find(m => m.title === 'Telefonisch');
      expect(phoneMethod?.actionLink).not.toContain(' ');
      expect(phoneMethod?.actionLink).toBe('tel:056712345');
    });
  });
});
