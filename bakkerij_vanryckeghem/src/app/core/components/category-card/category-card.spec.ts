import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryCard } from './category-card';
import { provideRouter } from '@angular/router';
import { RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('CategoryCard', () => {
  let component: CategoryCard;
  let fixture: ComponentFixture<CategoryCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryCard],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryCard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Signal Inputs', () => {
    it('should accept required title input', () => {
      fixture.componentRef.setInput('title', 'Brood');
      fixture.componentRef.setInput('description', 'Fresh bread');
      fixture.detectChanges();
      expect(component.title()).toBe('Brood');
    });

    it('should accept required description input', () => {
      fixture.componentRef.setInput('title', 'Brood');
      fixture.componentRef.setInput('description', 'Dagvers ambachtelijk brood');
      fixture.detectChanges();
      expect(component.description()).toBe('Dagvers ambachtelijk brood');
    });

    it('should accept imageUrl input', () => {
      fixture.componentRef.setInput('title', 'Brood');
      fixture.componentRef.setInput('description', 'Fresh bread');
      fixture.componentRef.setInput('imageUrl', '/images/bread.jpg');
      fixture.detectChanges();
      expect(component.imageUrl()).toBe('/images/bread.jpg');
    });

    it('should accept routerLink input', () => {
      fixture.componentRef.setInput('title', 'Brood');
      fixture.componentRef.setInput('description', 'Fresh bread');
      fixture.componentRef.setInput('routerLink', '/assortiment');
      fixture.detectChanges();
      expect(component.routerLink()).toBe('/assortiment');
    });

    it('should accept queryParams input', () => {
      const params = { category: 'Brood' };
      fixture.componentRef.setInput('title', 'Brood');
      fixture.componentRef.setInput('description', 'Fresh bread');
      fixture.componentRef.setInput('queryParams', params);
      fixture.detectChanges();
      expect(component.queryParams()).toEqual(params);
    });

    it('should have undefined imageUrl when not provided', () => {
      fixture.componentRef.setInput('title', 'Brood');
      fixture.componentRef.setInput('description', 'Fresh bread');
      fixture.detectChanges();
      expect(component.imageUrl()).toBeUndefined();
    });

    it('should have undefined routerLink when not provided', () => {
      fixture.componentRef.setInput('title', 'Brood');
      fixture.componentRef.setInput('description', 'Fresh bread');
      fixture.detectChanges();
      expect(component.routerLink()).toBeUndefined();
    });

    it('should have undefined queryParams when not provided', () => {
      fixture.componentRef.setInput('title', 'Brood');
      fixture.componentRef.setInput('description', 'Fresh bread');
      fixture.detectChanges();
      expect(component.queryParams()).toBeUndefined();
    });
  });

  describe('DOM rendering', () => {
    it('should render title in the template', () => {
      fixture.componentRef.setInput('title', 'Gebak');
      fixture.componentRef.setInput('description', 'Delicious pastries');
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Gebak');
    });

    it('should render description in the template', () => {
      fixture.componentRef.setInput('title', 'Gebak');
      fixture.componentRef.setInput('description', 'Heerlijk vers gebak');
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Heerlijk vers gebak');
    });

    it('should have RouterLink directive when routerLink is provided', () => {
      fixture.componentRef.setInput('title', 'Brood');
      fixture.componentRef.setInput('description', 'Fresh bread');
      fixture.componentRef.setInput('routerLink', '/assortiment');
      fixture.detectChanges();
      const routerLinks = fixture.debugElement.queryAll(By.directive(RouterLink));
      expect(routerLinks.length).toBeGreaterThan(0);
    });

    it('should update title when input changes', () => {
      fixture.componentRef.setInput('title', 'Initial Title');
      fixture.componentRef.setInput('description', 'Description');
      fixture.detectChanges();
      expect(component.title()).toBe('Initial Title');

      fixture.componentRef.setInput('title', 'Updated Title');
      fixture.detectChanges();
      expect(component.title()).toBe('Updated Title');
    });

    it('should update description when input changes', () => {
      fixture.componentRef.setInput('title', 'Title');
      fixture.componentRef.setInput('description', 'Initial Description');
      fixture.detectChanges();
      expect(component.description()).toBe('Initial Description');

      fixture.componentRef.setInput('description', 'Updated Description');
      fixture.detectChanges();
      expect(component.description()).toBe('Updated Description');
    });
  });

  describe('Component integration', () => {
    it('should handle all inputs together', () => {
      const queryParams = { category: 'Brood', filter: 'fresh' };
      fixture.componentRef.setInput('title', 'Brood');
      fixture.componentRef.setInput('description', 'Dagvers ambachtelijk brood');
      fixture.componentRef.setInput('imageUrl', '/images/bread-category.jpg');
      fixture.componentRef.setInput('routerLink', '/assortiment');
      fixture.componentRef.setInput('queryParams', queryParams);
      fixture.detectChanges();

      expect(component.title()).toBe('Brood');
      expect(component.description()).toBe('Dagvers ambachtelijk brood');
      expect(component.imageUrl()).toBe('/images/bread-category.jpg');
      expect(component.routerLink()).toBe('/assortiment');
      expect(component.queryParams()).toEqual(queryParams);
    });

    it('should render correctly with minimal inputs', () => {
      fixture.componentRef.setInput('title', 'Ontbijtkoeken');
      fixture.componentRef.setInput('description', 'Traditionele ontbijtkoeken');
      fixture.detectChanges();

      expect(component.title()).toBe('Ontbijtkoeken');
      expect(component.description()).toBe('Traditionele ontbijtkoeken');
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Ontbijtkoeken');
      expect(compiled.textContent).toContain('Traditionele ontbijtkoeken');
    });
  });
});
