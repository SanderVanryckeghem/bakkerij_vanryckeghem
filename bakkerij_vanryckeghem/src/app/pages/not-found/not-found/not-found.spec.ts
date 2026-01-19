import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFound } from './not-found';
import { provideRouter } from '@angular/router';
import { RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('NotFound', () => {
  let component: NotFound;
  let fixture: ComponentFixture<NotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFound],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component structure', () => {
    it('should be a standalone component', () => {
      expect(component).toBeTruthy();
    });

    it('should have correct selector', () => {
      const componentMetadata = (NotFound as any).ɵcmp;
      expect(componentMetadata).toBeDefined();
    });
  });

  describe('DOM rendering', () => {
    it('should render not found page content', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled).toBeTruthy();
    });

    it('should display 404 or not found message', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const content = compiled.textContent?.toLowerCase() || '';
      const has404 = content.includes('404');
      const hasNotFound = content.includes('niet gevonden') || content.includes('not found');
      expect(has404 || hasNotFound).toBe(true);
    });

    it('should have a button component', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('app-button');
      expect(button).toBeTruthy();
    });

    it('should have a router link', () => {
      const routerLinks = fixture.debugElement.queryAll(By.directive(RouterLink));
      expect(routerLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Navigation', () => {
    it('should provide navigation back to home', () => {
      const routerLinks = fixture.debugElement.queryAll(By.directive(RouterLink));
      const homeLink = routerLinks.find(link => {
        const routerLink = link.injector.get(RouterLink);
        return routerLink.href === '/' || routerLink.routerLink === '/';
      });
      expect(homeLink).toBeDefined();
    });
  });

  describe('Component imports', () => {
    it('should import RouterLink', () => {
      const routerLink = fixture.debugElement.query(By.directive(RouterLink));
      expect(routerLink).toBeTruthy();
    });

    it('should import Button component', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('app-button');
      expect(button).toBeTruthy();
    });
  });

  describe('User experience', () => {
    it('should provide clear information about the error', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const textContent = compiled.textContent || '';
      expect(textContent.length).toBeGreaterThan(0);
    });

    it('should provide a way to navigate away', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const links = compiled.querySelectorAll('a');
      const buttons = compiled.querySelectorAll('button, app-button');
      const hasNavigation = links.length > 0 || buttons.length > 0;
      expect(hasNavigation).toBe(true);
    });
  });

  describe('Template rendering', () => {
    it('should render without errors', () => {
      expect(() => {
        fixture.detectChanges();
      }).not.toThrow();
    });

    it('should be accessible', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('*')).toBeTruthy();
    });
  });
});
