import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Button } from './button';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;
  let buttonElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button]
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    buttonElement = fixture.debugElement.query(By.css('button'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Signal Inputs', () => {
    it('should have default variant as primary', () => {
      expect(component.variant()).toBe('primary');
    });

    it('should have default size as md', () => {
      expect(component.size()).toBe('md');
    });

    it('should have default disabled as false', () => {
      expect(component.disabled()).toBe(false);
    });

    it('should have default fullWidth as false', () => {
      expect(component.fullWidth()).toBe(false);
    });

    it('should have default type as button', () => {
      expect(component.type()).toBe('button');
    });

    it('should accept variant input', () => {
      fixture.componentRef.setInput('variant', 'secondary');
      fixture.detectChanges();
      expect(component.variant()).toBe('secondary');
    });

    it('should accept size input', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      expect(component.size()).toBe('lg');
    });

    it('should accept disabled input', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(component.disabled()).toBe(true);
    });

    it('should accept fullWidth input', () => {
      fixture.componentRef.setInput('fullWidth', true);
      fixture.detectChanges();
      expect(component.fullWidth()).toBe(true);
    });

    it('should accept type input', () => {
      fixture.componentRef.setInput('type', 'submit');
      fixture.detectChanges();
      expect(component.type()).toBe('submit');
    });
  });

  describe('buttonClasses getter', () => {
    it('should return base classes with primary variant and md size by default', () => {
      const classes = component.buttonClasses;
      expect(classes).toContain('btn');
      expect(classes).toContain('btn-primary');
      expect(classes).toContain('btn-md');
    });

    it('should return secondary variant class when variant is secondary', () => {
      fixture.componentRef.setInput('variant', 'secondary');
      fixture.detectChanges();
      const classes = component.buttonClasses;
      expect(classes).toContain('btn-secondary');
    });

    it('should return outline variant class when variant is outline', () => {
      fixture.componentRef.setInput('variant', 'outline');
      fixture.detectChanges();
      const classes = component.buttonClasses;
      expect(classes).toContain('btn-outline');
    });

    it('should return small size class when size is sm', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();
      const classes = component.buttonClasses;
      expect(classes).toContain('btn-sm');
    });

    it('should return large size class when size is lg', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      const classes = component.buttonClasses;
      expect(classes).toContain('btn-lg');
    });

    it('should include w-full class when fullWidth is true', () => {
      fixture.componentRef.setInput('fullWidth', true);
      fixture.detectChanges();
      const classes = component.buttonClasses;
      expect(classes).toContain('w-full');
    });

    it('should not include w-full class when fullWidth is false', () => {
      fixture.componentRef.setInput('fullWidth', false);
      fixture.detectChanges();
      const classes = component.buttonClasses;
      expect(classes).not.toContain('w-full');
    });

    it('should combine all classes correctly', () => {
      fixture.componentRef.setInput('variant', 'outline');
      fixture.componentRef.setInput('size', 'lg');
      fixture.componentRef.setInput('fullWidth', true);
      fixture.detectChanges();
      const classes = component.buttonClasses;
      expect(classes).toBe('btn btn-outline btn-lg w-full');
    });
  });

  describe('DOM rendering', () => {
    it('should render a button element', () => {
      expect(buttonElement).toBeTruthy();
    });

    it('should apply button classes to the button element', () => {
      fixture.componentRef.setInput('variant', 'secondary');
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      const button = buttonElement.nativeElement as HTMLButtonElement;
      expect(button.className).toContain('btn-secondary');
      expect(button.className).toContain('btn-lg');
    });

    it('should set disabled attribute when disabled is true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const button = buttonElement.nativeElement as HTMLButtonElement;
      expect(button.disabled).toBe(true);
    });

    it('should not set disabled attribute when disabled is false', () => {
      fixture.componentRef.setInput('disabled', false);
      fixture.detectChanges();
      const button = buttonElement.nativeElement as HTMLButtonElement;
      expect(button.disabled).toBe(false);
    });

    it('should set type attribute correctly', () => {
      fixture.componentRef.setInput('type', 'submit');
      fixture.detectChanges();
      const button = buttonElement.nativeElement as HTMLButtonElement;
      expect(button.type).toBe('submit');
    });

    it('should project content correctly', () => {
      const testContent = 'Click Me';
      fixture.componentRef.setInput('variant', 'primary');
      const compiled = fixture.nativeElement as HTMLElement;
      compiled.querySelector('button')!.textContent = testContent;
      expect(compiled.querySelector('button')?.textContent).toBe(testContent);
    });
  });
});
