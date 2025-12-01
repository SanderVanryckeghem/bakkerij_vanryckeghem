import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contact } from './contact';
import { ContentService } from '../../../shared/services';
import { SeoService } from '../../../core/services/seo.service';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { BakeryInfo, OpeningHours } from '../../../shared/models';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;
  let contentService: jasmine.SpyObj<ContentService>;
  let seoService: jasmine.SpyObj<SeoService>;

  const mockOpeningHours: OpeningHours[] = [
    { day: 'Maandag', hours: 'Gesloten', isClosed: true },
    { day: 'Dinsdag', hours: 'Gesloten', isClosed: true },
    { day: 'Woensdag', hours: '08:30 - 12:30 / 13:45 - 19:00' },
    { day: 'Donderdag', hours: '08:30 - 12:30 / 13:45 - 19:00' },
    { day: 'Vrijdag', hours: '08:30 - 12:30 / 13:45 - 19:00' },
    { day: 'Zaterdag', hours: '08:15 - 12:30 / 13:45 - 19:00' },
    { day: 'Zondag', hours: '07:15 - 13:00' }
  ];

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
    openingHours: mockOpeningHours
  };

  beforeEach(async () => {
    const contentServiceSpy = jasmine.createSpyObj('ContentService', [], {
      bakeryInfo: signal<BakeryInfo | null>(mockBakeryInfo),
      openingHours: signal<OpeningHours[]>(mockOpeningHours),
      products: signal([]),
      categories: signal([]),
      faqs: signal([])
    });

    const seoServiceSpy = jasmine.createSpyObj('SeoService', ['updateMetaTags', 'addStructuredData']);

    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ContentService, useValue: contentServiceSpy },
        { provide: SeoService, useValue: seoServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    contentService = TestBed.inject(ContentService) as jasmine.SpyObj<ContentService>;
    seoService = TestBed.inject(SeoService) as jasmine.SpyObj<SeoService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component initialization', () => {
    it('should have bakery info from content service', () => {
      expect(component.bakeryInfo()).toEqual(mockBakeryInfo);
    });

    it('should call seoService.updateMetaTags on init', () => {
      expect(seoService.updateMetaTags).toHaveBeenCalledWith({
        title: 'Contact - Bakkerij Vanryckeghem | Overleiestraat 38, Harelbeke',
        description: 'Neem contact op met Bakkerij Vanryckeghem. Bezoek ons in de Overleiestraat 38, Harelbeke of bel ons op 056 71 23 45.',
        keywords: 'contact, adres, openingsuren, telefoon, Harelbeke, Overleiestraat',
        url: 'https://www.bakkerijvanryckeghem.be/contact'
      });
    });
  });

  describe('contactInfo computed', () => {
    it('should return empty array when bakery info is null', () => {
      contentService.bakeryInfo.set(null);
      const info = component.contactInfo();
      expect(info).toEqual([]);
    });

    it('should return contact info array with 3 items when bakery info exists', () => {
      const info = component.contactInfo();
      expect(info.length).toBe(3);
    });

    it('should have address as first contact info', () => {
      const info = component.contactInfo();
      const addressInfo = info.find(i => i.type === 'address');
      expect(addressInfo).toBeDefined();
      expect(addressInfo?.label).toBe('Adres');
      expect(addressInfo?.value).toBe('Overleiestraat 38, 8530 Harelbeke');
    });

    it('should have phone as second contact info', () => {
      const info = component.contactInfo();
      const phoneInfo = info.find(i => i.type === 'phone');
      expect(phoneInfo).toBeDefined();
      expect(phoneInfo?.label).toBe('Telefoon');
      expect(phoneInfo?.value).toBe('056 71 23 45');
    });

    it('should have email as third contact info', () => {
      const info = component.contactInfo();
      const emailInfo = info.find(i => i.type === 'email');
      expect(emailInfo).toBeDefined();
      expect(emailInfo?.label).toBe('E-mail');
      expect(emailInfo?.value).toBe('info@bakkerijvanryckeghem.be');
    });

    it('should have correct Google Maps link for address', () => {
      const info = component.contactInfo();
      const addressInfo = info.find(i => i.type === 'address');
      expect(addressInfo?.link).toContain('maps.google.com');
      expect(addressInfo?.link).toContain('Overleiestraat');
      expect(addressInfo?.link).toContain('38');
      expect(addressInfo?.link).toContain('8530');
      expect(addressInfo?.link).toContain('Harelbeke');
    });

    it('should have correct tel link for phone', () => {
      const info = component.contactInfo();
      const phoneInfo = info.find(i => i.type === 'phone');
      expect(phoneInfo?.link).toBe('tel:056712345');
    });

    it('should have correct mailto link for email', () => {
      const info = component.contactInfo();
      const emailInfo = info.find(i => i.type === 'email');
      expect(emailInfo?.link).toBe('mailto:info@bakkerijvanryckeghem.be');
    });

    it('should have icon for each contact info', () => {
      const info = component.contactInfo();
      info.forEach(item => {
        expect(item.icon).toBeDefined();
        expect(item.icon.length).toBeGreaterThan(0);
      });
    });
  });

  describe('openingHours computed', () => {
    it('should return opening hours from content service', () => {
      const hours = component.openingHours();
      expect(hours.length).toBe(7);
    });

    it('should mark today correctly based on current day', () => {
      const hours = component.openingHours();
      const today = new Date().getDay();
      const expectedIndex = today === 0 ? 6 : today - 1;

      hours.forEach((hour, index) => {
        if (index === expectedIndex) {
          expect(hour.isToday).toBe(true);
        } else {
          expect(hour.isToday).toBe(false);
        }
      });
    });

    it('should include all days of the week', () => {
      const hours = component.openingHours();
      const days = hours.map(h => h.day);
      expect(days).toContain('Maandag');
      expect(days).toContain('Dinsdag');
      expect(days).toContain('Woensdag');
      expect(days).toContain('Donderdag');
      expect(days).toContain('Vrijdag');
      expect(days).toContain('Zaterdag');
      expect(days).toContain('Zondag');
    });

    it('should preserve hours information', () => {
      const hours = component.openingHours();
      const monday = hours.find(h => h.day === 'Maandag');
      expect(monday?.hours).toBe('Gesloten');
      expect(monday?.isClosed).toBe(true);
    });
  });

  describe('ngOnInit', () => {
    it('should update SEO meta tags with correct values', () => {
      expect(seoService.updateMetaTags).toHaveBeenCalledWith(
        jasmine.objectContaining({
          title: jasmine.stringContaining('Contact'),
          description: jasmine.stringContaining('Overleiestraat 38'),
          keywords: jasmine.stringContaining('contact'),
          url: 'https://www.bakkerijvanryckeghem.be/contact'
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

    it('should display contact information', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('056 71 23 45');
      expect(compiled.textContent).toContain('info@bakkerijvanryckeghem.be');
    });

    it('should display opening hours', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Maandag');
      expect(compiled.textContent).toContain('Zondag');
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

    it('should recompute contactInfo when bakery info changes', () => {
      const newBakeryInfo: BakeryInfo = {
        ...mockBakeryInfo,
        contact: {
          ...mockBakeryInfo.contact,
          phone: '999 99 99 99'
        }
      };
      contentService.bakeryInfo.set(newBakeryInfo);
      fixture.detectChanges();

      const info = component.contactInfo();
      const phoneInfo = info.find(i => i.type === 'phone');
      expect(phoneInfo?.value).toBe('999 99 99 99');
    });

    it('should recompute openingHours when content service signal changes', () => {
      const newHours: OpeningHours[] = [
        { day: 'Monday', hours: '9:00 - 17:00' }
      ];
      contentService.openingHours.set(newHours);
      fixture.detectChanges();

      const hours = component.openingHours();
      expect(hours.length).toBe(1);
      expect(hours[0].day).toBe('Monday');
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
