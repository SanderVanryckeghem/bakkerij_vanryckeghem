import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Card } from './card';

describe('Card', () => {
  let component: Card;
  let fixture: ComponentFixture<Card>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card]
    }).compileComponents();

    fixture = TestBed.createComponent(Card);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Signal Inputs', () => {
    it('should have default hoverable as true', () => {
      expect(component.hoverable()).toBe(true);
    });

    it('should have default padding as md', () => {
      expect(component.padding()).toBe('md');
    });

    it('should accept hoverable input', () => {
      fixture.componentRef.setInput('hoverable', false);
      fixture.detectChanges();
      expect(component.hoverable()).toBe(false);
    });

    it('should accept padding input sm', () => {
      fixture.componentRef.setInput('padding', 'sm');
      fixture.detectChanges();
      expect(component.padding()).toBe('sm');
    });

    it('should accept padding input lg', () => {
      fixture.componentRef.setInput('padding', 'lg');
      fixture.detectChanges();
      expect(component.padding()).toBe('lg');
    });
  });

  describe('cardClasses getter', () => {
    it('should return base card class and hoverable class by default', () => {
      const classes = component.cardClasses;
      expect(classes).toContain('card');
      expect(classes).toContain('card-hoverable');
      expect(classes).toContain('card-padding-md');
    });

    it('should include hoverable class when hoverable is true', () => {
      fixture.componentRef.setInput('hoverable', true);
      fixture.detectChanges();
      const classes = component.cardClasses;
      expect(classes).toContain('card-hoverable');
    });

    it('should not include hoverable class when hoverable is false', () => {
      fixture.componentRef.setInput('hoverable', false);
      fixture.detectChanges();
      const classes = component.cardClasses;
      expect(classes).not.toContain('card-hoverable');
    });

    it('should return small padding class when padding is sm', () => {
      fixture.componentRef.setInput('padding', 'sm');
      fixture.detectChanges();
      const classes = component.cardClasses;
      expect(classes).toContain('card-padding-sm');
    });

    it('should return medium padding class when padding is md', () => {
      fixture.componentRef.setInput('padding', 'md');
      fixture.detectChanges();
      const classes = component.cardClasses;
      expect(classes).toContain('card-padding-md');
    });

    it('should return large padding class when padding is lg', () => {
      fixture.componentRef.setInput('padding', 'lg');
      fixture.detectChanges();
      const classes = component.cardClasses;
      expect(classes).toContain('card-padding-lg');
    });

    it('should combine all classes correctly', () => {
      fixture.componentRef.setInput('hoverable', true);
      fixture.componentRef.setInput('padding', 'lg');
      fixture.detectChanges();
      const classes = component.cardClasses;
      expect(classes).toBe('card card-hoverable card-padding-lg');
    });

    it('should only have base and padding classes when hoverable is false', () => {
      fixture.componentRef.setInput('hoverable', false);
      fixture.componentRef.setInput('padding', 'sm');
      fixture.detectChanges();
      const classes = component.cardClasses;
      expect(classes).toBe('card card-padding-sm');
    });
  });

  describe('DOM rendering', () => {
    it('should render card element with base class', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const cardDiv = compiled.querySelector('.card');
      expect(cardDiv).toBeTruthy();
      expect(cardDiv?.classList.contains('card')).toBe(true);
    });

    it('should apply card classes to the element', () => {
      fixture.componentRef.setInput('hoverable', true);
      fixture.componentRef.setInput('padding', 'lg');
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const cardDiv = compiled.querySelector('.card');
      expect(cardDiv?.className).toContain('card-hoverable');
      expect(cardDiv?.className).toContain('card-padding-lg');
    });

    it('should update classes when inputs change', () => {
      fixture.componentRef.setInput('hoverable', true);
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      let cardDiv = compiled.querySelector('.card');
      expect(cardDiv?.className).toContain('card-hoverable');

      fixture.componentRef.setInput('hoverable', false);
      fixture.detectChanges();
      cardDiv = compiled.querySelector('.card');
      expect(cardDiv?.className).not.toContain('card-hoverable');
    });

    it('should project content correctly', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const cardDiv = compiled.querySelector('.card');
      expect(cardDiv).toBeTruthy();
    });
  });
});
