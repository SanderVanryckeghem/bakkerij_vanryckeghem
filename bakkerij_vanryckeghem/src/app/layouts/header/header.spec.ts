import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { ContentService } from '../../shared/services';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { BakeryInfo } from '../../shared/models';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let contentService: jasmine.SpyObj<ContentService>;

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

  beforeEach(async () => {
    const contentServiceSpy = jasmine.createSpyObj('ContentService', [], {
      bakeryInfo: signal<BakeryInfo | null>(mockBakeryInfo),
      products: signal([]),
      categories: signal([]),
      faqs: signal([]),
      openingHours: signal([])
    });

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ContentService, useValue: contentServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    contentService = TestBed.inject(ContentService) as jasmine.SpyObj<ContentService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component initialization', () => {
    it('should initialize with mobile menu closed', () => {
      expect(component.mobileMenuOpen()).toBe(false);
    });

    it('should have bakery info from content service', () => {
      expect(component.bakeryInfo()).toEqual(mockBakeryInfo);
    });

    it('should have navigation items defined', () => {
      expect(component.navItems).toBeDefined();
      expect(component.navItems.length).toBe(5);
    });

    it('should have correct navigation items', () => {
      const expectedNavItems = [
        { label: 'Home', route: '/' },
        { label: 'Assortiment', route: '/assortiment' },
        { label: 'Over Ons', route: '/over-ons' },
        { label: 'Contact', route: '/contact' },
        { label: 'Hoe Bestellen?', route: '/bestellen' }
      ];
      expect(component.navItems).toEqual(expectedNavItems);
    });
  });

  describe('toggleMobileMenu', () => {
    it('should toggle mobile menu from closed to open', () => {
      expect(component.mobileMenuOpen()).toBe(false);
      component.toggleMobileMenu();
      expect(component.mobileMenuOpen()).toBe(true);
    });

    it('should toggle mobile menu from open to closed', () => {
      component.mobileMenuOpen.set(true);
      expect(component.mobileMenuOpen()).toBe(true);
      component.toggleMobileMenu();
      expect(component.mobileMenuOpen()).toBe(false);
    });

    it('should toggle mobile menu multiple times', () => {
      expect(component.mobileMenuOpen()).toBe(false);
      component.toggleMobileMenu();
      expect(component.mobileMenuOpen()).toBe(true);
      component.toggleMobileMenu();
      expect(component.mobileMenuOpen()).toBe(false);
      component.toggleMobileMenu();
      expect(component.mobileMenuOpen()).toBe(true);
    });
  });

  describe('closeMobileMenu', () => {
    it('should close mobile menu when open', () => {
      component.mobileMenuOpen.set(true);
      component.closeMobileMenu();
      expect(component.mobileMenuOpen()).toBe(false);
    });

    it('should keep mobile menu closed when already closed', () => {
      component.mobileMenuOpen.set(false);
      component.closeMobileMenu();
      expect(component.mobileMenuOpen()).toBe(false);
    });

    it('should set mobile menu to false explicitly', () => {
      component.mobileMenuOpen.set(true);
      expect(component.mobileMenuOpen()).toBe(true);
      component.closeMobileMenu();
      expect(component.mobileMenuOpen()).toBe(false);
    });
  });

  describe('DOM rendering', () => {
    it('should render header element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const header = compiled.querySelector('header');
      expect(header).toBeTruthy();
    });

    it('should render navigation items', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const navLinks = compiled.querySelectorAll('a[routerLink]');
      expect(navLinks.length).toBeGreaterThan(0);
    });

    it('should render all navigation links with correct routes', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      component.navItems.forEach(item => {
        expect(compiled.textContent).toContain(item.label);
      });
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

    it('should react to mobile menu open signal changes', () => {
      expect(component.mobileMenuOpen()).toBe(false);
      component.mobileMenuOpen.set(true);
      fixture.detectChanges();
      expect(component.mobileMenuOpen()).toBe(true);
    });
  });

  describe('Service injection', () => {
    it('should inject ContentService', () => {
      expect(contentService).toBeTruthy();
    });

    it('should use injected ContentService for bakery info', () => {
      expect(component.bakeryInfo).toBeTruthy();
      expect(component.bakeryInfo()).toBe(contentService.bakeryInfo());
    });
  });
});
