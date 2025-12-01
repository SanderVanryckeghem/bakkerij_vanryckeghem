import { TestBed } from '@angular/core/testing';
import { SeoService, PageMeta } from './seo.service';
import { Meta, Title } from '@angular/platform-browser';

describe('SeoService', () => {
  let service: SeoService;
  let metaService: jasmine.SpyObj<Meta>;
  let titleService: jasmine.SpyObj<Title>;

  beforeEach(() => {
    const metaSpy = jasmine.createSpyObj('Meta', ['updateTag']);
    const titleSpy = jasmine.createSpyObj('Title', ['setTitle']);

    TestBed.configureTestingModule({
      providers: [
        SeoService,
        { provide: Meta, useValue: metaSpy },
        { provide: Title, useValue: titleSpy }
      ]
    });

    service = TestBed.inject(SeoService);
    metaService = TestBed.inject(Meta) as jasmine.SpyObj<Meta>;
    titleService = TestBed.inject(Title) as jasmine.SpyObj<Title>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Service initialization', () => {
    it('should have default meta tags defined', () => {
      expect((service as any).defaultMeta).toBeDefined();
    });

    it('should have default title', () => {
      const defaultMeta = (service as any).defaultMeta;
      expect(defaultMeta.title).toBe('Bakkerij Vanryckeghem - Ambachtelijk Brood & Gebak in Harelbeke');
    });

    it('should have default description', () => {
      const defaultMeta = (service as any).defaultMeta;
      expect(defaultMeta.description).toContain('Ambachtelijke bakkerij');
      expect(defaultMeta.description).toContain('Harelbeke');
    });

    it('should have default keywords', () => {
      const defaultMeta = (service as any).defaultMeta;
      expect(defaultMeta.keywords).toContain('bakkerij');
      expect(defaultMeta.keywords).toContain('Harelbeke');
    });

    it('should have default image', () => {
      const defaultMeta = (service as any).defaultMeta;
      expect(defaultMeta.image).toBe('/images/bakery/logo_vanryckeghem.png');
    });

    it('should have default URL', () => {
      const defaultMeta = (service as any).defaultMeta;
      expect(defaultMeta.url).toBe('https://www.bakkerijvanryckeghem.be');
    });
  });

  describe('updateMetaTags', () => {
    it('should update page title', () => {
      const pageMeta: Partial<PageMeta> = {
        title: 'Test Page Title'
      };

      service.updateMetaTags(pageMeta);

      expect(titleService.setTitle).toHaveBeenCalledWith('Test Page Title');
    });

    it('should update meta description', () => {
      const pageMeta: Partial<PageMeta> = {
        description: 'Test description'
      };

      service.updateMetaTags(pageMeta);

      expect(metaService.updateTag).toHaveBeenCalledWith({
        name: 'description',
        content: 'Test description'
      });
    });

    it('should update meta keywords when provided', () => {
      const pageMeta: Partial<PageMeta> = {
        keywords: 'test, keywords, bakery'
      };

      service.updateMetaTags(pageMeta);

      expect(metaService.updateTag).toHaveBeenCalledWith({
        name: 'keywords',
        content: 'test, keywords, bakery'
      });
    });

    it('should use default keywords when not provided', () => {
      const pageMeta: Partial<PageMeta> = {
        title: 'Test'
      };

      metaService.updateTag.calls.reset();
      service.updateMetaTags(pageMeta);

      const keywordsCalls = metaService.updateTag.calls.all().filter(
        call => call.args[0].name === 'keywords'
      );
      expect(keywordsCalls.length).toBe(1);
      expect(keywordsCalls[0].args[0].content).toContain('bakkerij');
    });

    it('should merge with default meta tags', () => {
      const pageMeta: Partial<PageMeta> = {
        title: 'Custom Title'
      };

      service.updateMetaTags(pageMeta);

      expect(titleService.setTitle).toHaveBeenCalledWith('Custom Title');
      expect(metaService.updateTag).toHaveBeenCalledWith(
        jasmine.objectContaining({
          name: 'description',
          content: jasmine.stringContaining('Ambachtelijke bakkerij')
        })
      );
    });

    it('should update Open Graph title', () => {
      const pageMeta: Partial<PageMeta> = {
        title: 'OG Test Title'
      };

      service.updateMetaTags(pageMeta);

      expect(metaService.updateTag).toHaveBeenCalledWith({
        property: 'og:title',
        content: 'OG Test Title'
      });
    });

    it('should update Open Graph description', () => {
      const pageMeta: Partial<PageMeta> = {
        description: 'OG Test Description'
      };

      service.updateMetaTags(pageMeta);

      expect(metaService.updateTag).toHaveBeenCalledWith({
        property: 'og:description',
        content: 'OG Test Description'
      });
    });

    it('should set Open Graph type to website', () => {
      service.updateMetaTags({});

      expect(metaService.updateTag).toHaveBeenCalledWith({
        property: 'og:type',
        content: 'website'
      });
    });

    it('should update Open Graph image when provided', () => {
      const pageMeta: Partial<PageMeta> = {
        image: '/images/custom-image.jpg'
      };

      service.updateMetaTags(pageMeta);

      expect(metaService.updateTag).toHaveBeenCalledWith({
        property: 'og:image',
        content: '/images/custom-image.jpg'
      });
    });

    it('should update Open Graph URL when provided', () => {
      const pageMeta: Partial<PageMeta> = {
        url: 'https://www.example.com/page'
      };

      service.updateMetaTags(pageMeta);

      expect(metaService.updateTag).toHaveBeenCalledWith({
        property: 'og:url',
        content: 'https://www.example.com/page'
      });
    });

    it('should update Twitter card type', () => {
      service.updateMetaTags({});

      expect(metaService.updateTag).toHaveBeenCalledWith({
        name: 'twitter:card',
        content: 'summary_large_image'
      });
    });

    it('should update Twitter title', () => {
      const pageMeta: Partial<PageMeta> = {
        title: 'Twitter Test Title'
      };

      service.updateMetaTags(pageMeta);

      expect(metaService.updateTag).toHaveBeenCalledWith({
        name: 'twitter:title',
        content: 'Twitter Test Title'
      });
    });

    it('should update Twitter description', () => {
      const pageMeta: Partial<PageMeta> = {
        description: 'Twitter Test Description'
      };

      service.updateMetaTags(pageMeta);

      expect(metaService.updateTag).toHaveBeenCalledWith({
        name: 'twitter:description',
        content: 'Twitter Test Description'
      });
    });

    it('should update Twitter image when provided', () => {
      const pageMeta: Partial<PageMeta> = {
        image: '/images/twitter-image.jpg'
      };

      service.updateMetaTags(pageMeta);

      expect(metaService.updateTag).toHaveBeenCalledWith({
        name: 'twitter:image',
        content: '/images/twitter-image.jpg'
      });
    });

    it('should handle complete page meta', () => {
      const pageMeta: PageMeta = {
        title: 'Complete Page',
        description: 'Complete description',
        keywords: 'complete, keywords',
        image: '/images/complete.jpg',
        url: 'https://www.example.com/complete'
      };

      service.updateMetaTags(pageMeta);

      expect(titleService.setTitle).toHaveBeenCalledWith('Complete Page');
      expect(metaService.updateTag).toHaveBeenCalledWith({
        name: 'description',
        content: 'Complete description'
      });
      expect(metaService.updateTag).toHaveBeenCalledWith({
        name: 'keywords',
        content: 'complete, keywords'
      });
    });
  });

  describe('addStructuredData', () => {
    let originalCreateElement: any;
    let mockScript: any;

    beforeEach(() => {
      mockScript = {
        type: '',
        text: '',
        setAttribute: jasmine.createSpy('setAttribute')
      };

      originalCreateElement = document.createElement;
      spyOn(document, 'createElement').and.returnValue(mockScript);
      spyOn(document.head, 'appendChild');
    });

    afterEach(() => {
      document.createElement = originalCreateElement;
    });

    it('should create a script element', () => {
      const data = { name: 'Bakkerij Van Ryckeghem' };
      service.addStructuredData(data);

      expect(document.createElement).toHaveBeenCalledWith('script');
    });

    it('should set script type to application/ld+json', () => {
      const data = { name: 'Bakkerij Van Ryckeghem' };
      service.addStructuredData(data);

      expect(mockScript.type).toBe('application/ld+json');
    });

    it('should set script text to JSON stringified data', () => {
      const data = { name: 'Bakkerij Van Ryckeghem', type: 'Bakery' };
      service.addStructuredData(data);

      expect(mockScript.text).toBe(JSON.stringify(data));
    });

    it('should append script to document head', () => {
      const data = { name: 'Bakkerij Van Ryckeghem' };
      service.addStructuredData(data);

      expect(document.head.appendChild).toHaveBeenCalledWith(mockScript);
    });

    it('should handle complex structured data', () => {
      const data = {
        '@context': 'https://schema.org',
        '@type': 'Bakery',
        name: 'Bakkerij Van Ryckeghem',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Overleiestraat 38',
          addressLocality: 'Harelbeke',
          postalCode: '8530'
        }
      };

      service.addStructuredData(data);

      expect(mockScript.text).toBe(JSON.stringify(data));
      expect(document.head.appendChild).toHaveBeenCalled();
    });
  });

  describe('Service injection', () => {
    it('should inject Meta service', () => {
      expect(metaService).toBeTruthy();
    });

    it('should inject Title service', () => {
      expect(titleService).toBeTruthy();
    });
  });
});
