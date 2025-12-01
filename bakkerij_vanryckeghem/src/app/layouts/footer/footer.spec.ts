import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';
import { ContentService } from '../../shared/services';
import { signal } from '@angular/core';
import { BakeryInfo, OpeningHours } from '../../shared/models';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;
  let contentService: jasmine.SpyObj<ContentService>;

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
      products: signal([]),
      categories: signal([]),
      faqs: signal([]),
      openingHours: signal(mockOpeningHours)
    });

    await TestBed.configureTestingModule({
      imports: [Footer],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ContentService, useValue: contentServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    contentService = TestBed.inject(ContentService) as jasmine.SpyObj<ContentService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component initialization', () => {
    it('should set current year', () => {
      const currentYear = new Date().getFullYear();
      expect(component.currentYear).toBe(currentYear);
    });

    it('should have bakery info from content service', () => {
      expect(component.bakeryInfo()).toEqual(mockBakeryInfo);
    });

    it('should have compact opening hours', () => {
      expect(component.compactOpeningHours).toBeDefined();
      expect(component.compactOpeningHours.length).toBe(4);
    });
  });

  describe('getCompactHours', () => {
    it('should return 4 compact hour entries', () => {
      expect(component.compactOpeningHours.length).toBe(4);
    });

    it('should have Monday-Tuesday as first entry', () => {
      const firstEntry = component.compactOpeningHours[0];
      expect(firstEntry.days).toBe('Maandag - Dinsdag');
      expect(firstEntry.hours).toBe('Gesloten');
      expect(firstEntry.isClosed).toBe(true);
    });

    it('should have Wednesday-Friday as second entry', () => {
      const secondEntry = component.compactOpeningHours[1];
      expect(secondEntry.days).toBe('Woensdag - Vrijdag');
      expect(secondEntry.hours).toBe('08:30 – 12:30 / 13:45 – 19:00');
    });

    it('should have Saturday as third entry', () => {
      const thirdEntry = component.compactOpeningHours[2];
      expect(thirdEntry.days).toBe('Zaterdag');
      expect(thirdEntry.hours).toBe('08:15 – 12:30 / 13:45 – 19:00');
    });

    it('should have Sunday as fourth entry', () => {
      const fourthEntry = component.compactOpeningHours[3];
      expect(fourthEntry.days).toBe('Zondag');
      expect(fourthEntry.hours).toBe('07:15 – 13:00');
    });

    it('should mark Monday or Tuesday as today when applicable', () => {
      const today = new Date().getDay();
      const mondayTuesdayEntry = component.compactOpeningHours[0];
      if (today === 1 || today === 2) {
        expect(mondayTuesdayEntry.isToday).toBe(true);
      } else {
        expect(mondayTuesdayEntry.isToday).toBe(false);
      }
    });

    it('should mark Wednesday-Friday as today when applicable', () => {
      const today = new Date().getDay();
      const wedFriEntry = component.compactOpeningHours[1];
      if (today === 3 || today === 4 || today === 5) {
        expect(wedFriEntry.isToday).toBe(true);
      } else {
        expect(wedFriEntry.isToday).toBe(false);
      }
    });

    it('should mark Saturday as today when applicable', () => {
      const today = new Date().getDay();
      const saturdayEntry = component.compactOpeningHours[2];
      if (today === 6) {
        expect(saturdayEntry.isToday).toBe(true);
      } else {
        expect(saturdayEntry.isToday).toBe(false);
      }
    });

    it('should mark Sunday as today when applicable', () => {
      const today = new Date().getDay();
      const sundayEntry = component.compactOpeningHours[3];
      if (today === 0) {
        expect(sundayEntry.isToday).toBe(true);
      } else {
        expect(sundayEntry.isToday).toBe(false);
      }
    });
  });

  describe('DOM rendering', () => {
    it('should render footer element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const footer = compiled.querySelector('footer');
      expect(footer).toBeTruthy();
    });

    it('should display current year', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const currentYear = new Date().getFullYear();
      expect(compiled.textContent).toContain(currentYear.toString());
    });

    it('should display bakery name', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Bakkerij Van Ryckeghem');
    });

    it('should display compact opening hours', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Maandag - Dinsdag');
      expect(compiled.textContent).toContain('Woensdag - Vrijdag');
      expect(compiled.textContent).toContain('Zaterdag');
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

  describe('CompactHours interface', () => {
    it('should have correct structure for each compact hour entry', () => {
      component.compactOpeningHours.forEach(entry => {
        expect(entry.days).toBeDefined();
        expect(entry.hours).toBeDefined();
        expect(typeof entry.days).toBe('string');
        expect(typeof entry.hours).toBe('string');
      });
    });

    it('should mark closed entries correctly', () => {
      const closedEntry = component.compactOpeningHours.find(entry => entry.isClosed);
      expect(closedEntry).toBeDefined();
      expect(closedEntry?.hours).toBe('Gesloten');
    });
  });
});
