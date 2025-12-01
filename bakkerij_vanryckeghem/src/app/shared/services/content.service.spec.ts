import { TestBed } from '@angular/core/testing';
import { ContentService } from './content.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product, BakeryInfo, OpeningHours, FAQItem, Category, PopupConfig } from '../models';

describe('ContentService', () => {
  let service: ContentService;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    { id: 1, name: 'Wit Brood', description: 'Fresh white bread', category: 'Brood' },
    { id: 2, name: 'Croissant', description: 'Buttery croissant', category: 'Gebak' }
  ];

  const mockCategories: Category[] = [
    { title: 'Brood', description: 'Fresh bread', routerLink: '/assortiment', queryParams: { category: 'Brood' } },
    { title: 'Gebak', description: 'Delicious pastries', routerLink: '/assortiment', queryParams: { category: 'Gebak' } }
  ];

  const mockFaqs: FAQItem[] = [
    { question: 'What are your hours?', answer: 'We are open daily' },
    { question: 'Do you deliver?', answer: 'Yes, we do' }
  ];

  const mockOpeningHours: OpeningHours[] = [
    { day: 'Maandag', hours: 'Gesloten', isClosed: true },
    { day: 'Dinsdag', hours: 'Gesloten', isClosed: true },
    { day: 'Woensdag', hours: '08:30 - 12:30 / 13:45 - 19:00' }
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
    openingHours: []
  };

  const mockPopupConfig: PopupConfig = {
    show: false,
    title: 'Welkom!',
    message: 'Test message',
    buttonText: 'Sluiten'
  };

  function flushAllRequests() {
    httpMock.expectOne('assets/data/products.json').flush(mockProducts);
    httpMock.expectOne('assets/data/categories.json').flush(mockCategories);
    httpMock.expectOne('assets/data/faq.json').flush(mockFaqs);
    httpMock.expectOne('assets/data/opening-hours.json').flush(mockOpeningHours);
    httpMock.expectOne('assets/data/popup.json').flush(mockPopupConfig);
    httpMock.expectOne('assets/data/bakery-info.json').flush(mockBakeryInfo);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContentService]
    });
    service = TestBed.inject(ContentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    flushAllRequests();
    expect(service).toBeTruthy();
  });

  describe('Service initialization', () => {
    it('should load data on initialization', () => {
      const productsReq = httpMock.expectOne('assets/data/products.json');
      const categoriesReq = httpMock.expectOne('assets/data/categories.json');
      const faqsReq = httpMock.expectOne('assets/data/faq.json');
      const openingHoursReq = httpMock.expectOne('assets/data/opening-hours.json');
      const popupReq = httpMock.expectOne('assets/data/popup.json');

      expect(productsReq.request.method).toBe('GET');
      expect(categoriesReq.request.method).toBe('GET');
      expect(faqsReq.request.method).toBe('GET');
      expect(openingHoursReq.request.method).toBe('GET');
      expect(popupReq.request.method).toBe('GET');

      productsReq.flush(mockProducts);
      categoriesReq.flush(mockCategories);
      faqsReq.flush(mockFaqs);
      openingHoursReq.flush(mockOpeningHours);
      popupReq.flush(mockPopupConfig);

      const bakeryInfoReq = httpMock.expectOne('assets/data/bakery-info.json');
      expect(bakeryInfoReq.request.method).toBe('GET');
      bakeryInfoReq.flush(mockBakeryInfo);
    });
  });

  describe('getProducts', () => {
    beforeEach(() => {
      flushAllRequests();
    });

    it('should return all products', () => {
      const products = service.getProducts();
      expect(products).toEqual(mockProducts);
      expect(products.length).toBe(2);
    });

    it('should return products signal value', () => {
      const products = service.getProducts();
      expect(products).toBe(service.products());
    });
  });

  describe('getProductById', () => {
    beforeEach(() => {
      flushAllRequests();
    });

    it('should return product by id', () => {
      const product = service.getProductById(1);
      expect(product).toBeDefined();
      expect(product?.id).toBe(1);
      expect(product?.name).toBe('Wit Brood');
    });

    it('should return undefined for non-existent id', () => {
      const product = service.getProductById(999);
      expect(product).toBeUndefined();
    });

    it('should return correct product for different ids', () => {
      const product1 = service.getProductById(1);
      const product2 = service.getProductById(2);
      expect(product1?.name).toBe('Wit Brood');
      expect(product2?.name).toBe('Croissant');
    });
  });

  describe('getProductsByCategory', () => {
    beforeEach(() => {
      flushAllRequests();
    });

    it('should return products by category', () => {
      const broodProducts = service.getProductsByCategory('Brood');
      expect(broodProducts.length).toBe(1);
      expect(broodProducts[0].category).toBe('Brood');
    });

    it('should return empty array for non-existent category', () => {
      const products = service.getProductsByCategory('NonExistent');
      expect(products).toEqual([]);
    });

    it('should return all products matching the category', () => {
      const gebakProducts = service.getProductsByCategory('Gebak');
      expect(gebakProducts.length).toBe(1);
      expect(gebakProducts.every(p => p.category === 'Gebak')).toBe(true);
    });
  });

  describe('getBakeryInfo', () => {
    beforeEach(() => {
      flushAllRequests();
    });

    it('should return bakery info', () => {
      const info = service.getBakeryInfo();
      expect(info).toBeDefined();
      expect(info?.name).toBe('Bakkerij Van Ryckeghem');
    });

    it('should return bakery info signal value', () => {
      const info = service.getBakeryInfo();
      expect(info).toBe(service.bakeryInfo());
    });

    it('should include merged opening hours', () => {
      const info = service.getBakeryInfo();
      expect(info?.openingHours).toEqual(mockOpeningHours);
    });
  });

  describe('getOpeningHours', () => {
    beforeEach(() => {
      flushAllRequests();
    });

    it('should return opening hours', () => {
      const hours = service.getOpeningHours();
      expect(hours).toEqual(mockOpeningHours);
    });

    it('should return opening hours signal value', () => {
      const hours = service.getOpeningHours();
      expect(hours).toBe(service.openingHours());
    });
  });

  describe('getFAQs', () => {
    beforeEach(() => {
      flushAllRequests();
    });

    it('should return FAQs', () => {
      const faqs = service.getFAQs();
      expect(faqs).toEqual(mockFaqs);
      expect(faqs.length).toBe(2);
    });

    it('should return FAQs signal value', () => {
      const faqs = service.getFAQs();
      expect(faqs).toBe(service.faqs());
    });
  });

  describe('getCategories', () => {
    beforeEach(() => {
      flushAllRequests();
    });

    it('should return categories', () => {
      const categories = service.getCategories();
      expect(categories).toEqual(mockCategories);
      expect(categories.length).toBe(2);
    });

    it('should return categories signal value', () => {
      const categories = service.getCategories();
      expect(categories).toBe(service.categories());
    });
  });

  describe('Signal reactivity', () => {
    beforeEach(() => {
      flushAllRequests();
    });

    it('should update products signal when data is loaded', () => {
      expect(service.products()).toEqual(mockProducts);
    });

    it('should update categories signal when data is loaded', () => {
      expect(service.categories()).toEqual(mockCategories);
    });

    it('should update faqs signal when data is loaded', () => {
      expect(service.faqs()).toEqual(mockFaqs);
    });

    it('should update opening hours signal when data is loaded', () => {
      expect(service.openingHours()).toEqual(mockOpeningHours);
    });

    it('should update bakery info signal when data is loaded', () => {
      const bakeryInfo = service.bakeryInfo();
      expect(bakeryInfo).toBeDefined();
      expect(bakeryInfo?.name).toBe('Bakkerij Van Ryckeghem');
    });
  });
});
