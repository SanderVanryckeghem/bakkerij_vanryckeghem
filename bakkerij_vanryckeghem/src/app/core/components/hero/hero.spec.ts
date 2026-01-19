import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hero } from './hero';
import { RouterLink } from '@angular/router';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Signal Inputs', () => {
    it('should accept required title input', () => {
      fixture.componentRef.setInput('title', 'Test Title');
      fixture.detectChanges();
      expect(component.title()).toBe('Test Title');
    });

    it('should accept subtitle input', () => {
      fixture.componentRef.setInput('title', 'Test Title');
      fixture.componentRef.setInput('subtitle', 'Test Subtitle');
      fixture.detectChanges();
      expect(component.subtitle()).toBe('Test Subtitle');
    });

    it('should accept ctaText input', () => {
      fixture.componentRef.setInput('title', 'Test Title');
      fixture.componentRef.setInput('ctaText', 'Click Here');
      fixture.detectChanges();
      expect(component.ctaText()).toBe('Click Here');
    });

    it('should accept ctaLink input', () => {
      fixture.componentRef.setInput('title', 'Test Title');
      fixture.componentRef.setInput('ctaLink', '/test-link');
      fixture.detectChanges();
      expect(component.ctaLink()).toBe('/test-link');
    });

    it('should accept backgroundImage input', () => {
      fixture.componentRef.setInput('title', 'Test Title');
      fixture.componentRef.setInput('backgroundImage', '/images/hero.jpg');
      fixture.detectChanges();
      expect(component.backgroundImage()).toBe('/images/hero.jpg');
    });

    it('should have undefined subtitle when not provided', () => {
      fixture.componentRef.setInput('title', 'Test Title');
      fixture.detectChanges();
      expect(component.subtitle()).toBeUndefined();
    });

    it('should have undefined ctaText when not provided', () => {
      fixture.componentRef.setInput('title', 'Test Title');
      fixture.detectChanges();
      expect(component.ctaText()).toBeUndefined();
    });

    it('should have undefined ctaLink when not provided', () => {
      fixture.componentRef.setInput('title', 'Test Title');
      fixture.detectChanges();
      expect(component.ctaLink()).toBeUndefined();
    });

    it('should have undefined backgroundImage when not provided', () => {
      fixture.componentRef.setInput('title', 'Test Title');
      fixture.detectChanges();
      expect(component.backgroundImage()).toBeUndefined();
    });
  });

  describe('DOM rendering', () => {
    it('should render title in the template', () => {
      fixture.componentRef.setInput('title', 'Welcome to Bakery');
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Welcome to Bakery');
    });

    it('should render subtitle when provided', () => {
      fixture.componentRef.setInput('title', 'Test Title');
      fixture.componentRef.setInput('subtitle', 'Fresh bread daily');
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Fresh bread daily');
    });

    it('should render CTA button when ctaText and ctaLink are provided', () => {
      fixture.componentRef.setInput('title', 'Test Title');
      fixture.componentRef.setInput('ctaText', 'Order Now');
      fixture.componentRef.setInput('ctaLink', '/order');
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Order Now');
    });

    it('should have routerLink directive when ctaLink is provided', () => {
      fixture.componentRef.setInput('title', 'Test Title');
      fixture.componentRef.setInput('ctaText', 'Order Now');
      fixture.componentRef.setInput('ctaLink', '/order');
      fixture.detectChanges();
      const routerLinks = fixture.debugElement.queryAll(By.directive(RouterLink));
      expect(routerLinks.length).toBeGreaterThan(0);
    });

    it('should update title when input changes', () => {
      fixture.componentRef.setInput('title', 'Initial Title');
      fixture.detectChanges();
      expect(component.title()).toBe('Initial Title');

      fixture.componentRef.setInput('title', 'Updated Title');
      fixture.detectChanges();
      expect(component.title()).toBe('Updated Title');
    });
  });

  describe('Component integration', () => {
    it('should import and use Button component', () => {
      fixture.componentRef.setInput('title', 'Test Title');
      fixture.componentRef.setInput('ctaText', 'Click Me');
      fixture.componentRef.setInput('ctaLink', '/test');
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('app-button');
      expect(button).toBeTruthy();
    });

    it('should handle all inputs together', () => {
      fixture.componentRef.setInput('title', 'Bakkerij Van Ryckeghem');
      fixture.componentRef.setInput('subtitle', 'Ambachtelijk sinds 1940');
      fixture.componentRef.setInput('ctaText', 'Ontdek ons assortiment');
      fixture.componentRef.setInput('ctaLink', '/assortiment');
      fixture.componentRef.setInput('backgroundImage', '/images/hero-bg.jpg');
      fixture.detectChanges();

      expect(component.title()).toBe('Bakkerij Van Ryckeghem');
      expect(component.subtitle()).toBe('Ambachtelijk sinds 1940');
      expect(component.ctaText()).toBe('Ontdek ons assortiment');
      expect(component.ctaLink()).toBe('/assortiment');
      expect(component.backgroundImage()).toBe('/images/hero-bg.jpg');
    });
  });
});
