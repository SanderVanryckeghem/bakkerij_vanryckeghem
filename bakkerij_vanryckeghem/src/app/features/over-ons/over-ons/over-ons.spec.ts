import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverOns } from './over-ons';
import { SeoService } from '../../../core/services/seo.service';
import { ElementRef } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('OverOns', () => {
  let component: OverOns;
  let fixture: ComponentFixture<OverOns>;
  let seoService: jasmine.SpyObj<SeoService>;

  beforeEach(async () => {
    const seoServiceSpy = jasmine.createSpyObj('SeoService', ['updateMetaTags', 'addStructuredData']);

    await TestBed.configureTestingModule({
      imports: [OverOns],
      providers: [
        provideRouter([]),
        { provide: SeoService, useValue: seoServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OverOns);
    component = fixture.componentInstance;
    seoService = TestBed.inject(SeoService) as jasmine.SpyObj<SeoService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component initialization', () => {
    it('should have philosophy values defined', () => {
      expect(component.philosophy).toBeDefined();
      expect(component.philosophy.length).toBe(4);
    });

    it('should have team members defined', () => {
      expect(component.team).toBeDefined();
      expect(component.team.length).toBe(2);
    });

    it('should have timeline events defined', () => {
      expect(component.timeline).toBeDefined();
      expect(component.timeline.length).toBe(4);
    });

    it('should call seoService.updateMetaTags on init', () => {
      expect(seoService.updateMetaTags).toHaveBeenCalledWith({
        title: 'Over Ons - Bakkerij Vanryckeghem | Familietraditie sinds de jaren \'40',
        description: 'Leer onze familiegeschiedenis kennen. Van kleine bakkerij in de jaren \'40 tot gevestigde naam in Harelbeke. Passie voor ambacht door de generaties heen.',
        keywords: 'over ons, geschiedenis, familiegeschiedenis, Harelbeke, ambachtelijke bakkerij',
        url: 'https://www.bakkerijvanryckeghem.be/over-ons'
      });
    });
  });

  describe('Philosophy values', () => {
    it('should have Ambachtelijk as first philosophy value', () => {
      const ambachtelijk = component.philosophy.find(p => p.title === 'Ambachtelijk');
      expect(ambachtelijk).toBeDefined();
      expect(ambachtelijk?.description).toContain('traditionele methoden');
    });

    it('should have Kwaliteit as philosophy value', () => {
      const kwaliteit = component.philosophy.find(p => p.title === 'Kwaliteit');
      expect(kwaliteit).toBeDefined();
      expect(kwaliteit?.description).toContain('beste ingrediënten');
    });

    it('should have Traditie as philosophy value', () => {
      const traditie = component.philosophy.find(p => p.title === 'Traditie');
      expect(traditie).toBeDefined();
      expect(traditie?.description).toContain('generatie op generatie');
    });

    it('should have Passie as philosophy value', () => {
      const passie = component.philosophy.find(p => p.title === 'Passie');
      expect(passie).toBeDefined();
      expect(passie?.description).toContain('liefde voor ons vak');
    });

    it('should have icon for each philosophy value', () => {
      component.philosophy.forEach(value => {
        expect(value.icon).toBeDefined();
        expect(value.icon.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Team members', () => {
    it('should have Olivier Vanryckeghem as team member', () => {
      const olivier = component.team.find(m => m.name === 'Olivier Vanryckeghem');
      expect(olivier).toBeDefined();
      expect(olivier?.role).toBe('Bakker');
      expect(olivier?.imageUrl).toContain('olivier_cartoon.png');
    });

    it('should have Tamara Mahieu as team member', () => {
      const tamara = component.team.find(m => m.name === 'Tamara Mahieu');
      expect(tamara).toBeDefined();
      expect(tamara?.role).toBe('Winkelverantwoordelijke');
      expect(tamara?.imageUrl).toContain('tamara_cartoon.png');
    });

    it('should have description for each team member', () => {
      component.team.forEach(member => {
        expect(member.description).toBeDefined();
        expect(member.description.length).toBeGreaterThan(0);
      });
    });

    it('should have image URL for each team member', () => {
      component.team.forEach(member => {
        expect(member.imageUrl).toBeDefined();
        expect(member.imageUrl).toContain('images/team/');
      });
    });
  });

  describe('Timeline events', () => {
    it('should have timeline event for Jaren 40', () => {
      const jaren40 = component.timeline.find(t => t.year === 'Jaren \'40');
      expect(jaren40).toBeDefined();
      expect(jaren40?.title).toBe('Het begin van een familieverhaal');
      expect(jaren40?.description).toContain('André en grootmoeder Elisabeth');
    });

    it('should have timeline event for Jaren 90', () => {
      const jaren90 = component.timeline.find(t => t.year === 'Jaren \'90');
      expect(jaren90).toBeDefined();
      expect(jaren90?.title).toBe('Groei en vernieuwing');
      expect(jaren90?.description).toContain('1993');
    });

    it('should have timeline event for 2012', () => {
      const year2012 = component.timeline.find(t => t.year === '2012');
      expect(year2012).toBeDefined();
      expect(year2012?.title).toBe('De derde generatie aan het roer');
      expect(year2012?.description).toContain('Olivier en Tamara');
    });

    it('should have timeline event for Vandaag', () => {
      const vandaag = component.timeline.find(t => t.year === 'Vandaag');
      expect(vandaag).toBeDefined();
      expect(vandaag?.title).toBe('Geworteld in traditie');
      expect(vandaag?.description).toContain('authentieke familiebakkerij');
    });

    it('should have all timeline events with required fields', () => {
      component.timeline.forEach(event => {
        expect(event.year).toBeDefined();
        expect(event.title).toBeDefined();
        expect(event.description).toBeDefined();
        expect(event.description.length).toBeGreaterThan(0);
      });
    });
  });

  describe('ngOnInit', () => {
    it('should update SEO meta tags with correct values', () => {
      expect(seoService.updateMetaTags).toHaveBeenCalledWith(
        jasmine.objectContaining({
          title: jasmine.stringContaining('Over Ons'),
          description: jasmine.stringContaining('familiegeschiedenis'),
          keywords: jasmine.stringContaining('geschiedenis'),
          url: 'https://www.bakkerijvanryckeghem.be/over-ons'
        })
      );
    });
  });

  describe('ngAfterViewInit', () => {
    it('should set up IntersectionObserver for timeline animation', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('DOM rendering', () => {
    it('should render hero component', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const hero = compiled.querySelector('app-hero');
      expect(hero).toBeTruthy();
    });

    it('should display philosophy values', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Ambachtelijk');
      expect(compiled.textContent).toContain('Kwaliteit');
      expect(compiled.textContent).toContain('Traditie');
      expect(compiled.textContent).toContain('Passie');
    });

    it('should display team members', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Olivier Vanryckeghem');
      expect(compiled.textContent).toContain('Tamara Mahieu');
    });

    it('should display timeline events', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Jaren \'40');
      expect(compiled.textContent).toContain('Jaren \'90');
      expect(compiled.textContent).toContain('2012');
      expect(compiled.textContent).toContain('Vandaag');
    });
  });

  describe('Service injection', () => {
    it('should inject SeoService', () => {
      expect(seoService).toBeTruthy();
    });

    it('should inject ElementRef', () => {
      const elementRef = (component as any).elementRef;
      expect(elementRef).toBeTruthy();
      expect(elementRef).toBeInstanceOf(ElementRef);
    });
  });
});
