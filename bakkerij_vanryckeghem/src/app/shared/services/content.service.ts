import { Injectable } from '@angular/core';
import { Product, BakeryInfo, OPENING_HOURS, FAQItem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private mockProducts: Product[] = [
    {
      id: 1,
      name: 'Wit Brood',
      description: 'Klassiek wit brood, knapperig van buiten en zacht van binnen',
      category: 'Brood',
      isAvailable: true,
      imageUrl: '/images/Brood&banket.png'
    },
    {
      id: 2,
      name: 'Volkoren Brood',
      description: 'Gezond en voedzaam volkoren brood met een heerlijke smaak',
      category: 'Brood',
      isAvailable: true,
      imageUrl: '/images/Brood&banket.png'
    },
    {
      id: 3,
      name: 'Meergranen Brood',
      description: 'Rijk meergranenbrood met zaden en pitten',
      category: 'Brood',
      isAvailable: true,
      imageUrl: '/images/Brood&banket.png'
    },
    {
      id: 4,
      name: 'Desem Brood',
      description: 'Traditioneel desembrood met een unieke smaak',
      category: 'Brood',
      isAvailable: true,
      imageUrl: '/images/Brood&banket.png'
    },
    {
      id: 5,
      name: 'Croissant',
      description: 'Boterrijke croissant, elke ochtend vers gebakken',
      category: 'Gebak',
      isAvailable: true,
      imageUrl: '/images/Brood&banket.png'
    },
    {
      id: 6,
      name: 'Chocoladekoek',
      description: 'Smeuïge chocoladekoek met pure chocolade',
      category: 'Gebak',
      isAvailable: true,
      imageUrl: '/images/Brood&banket.png'
    },
    {
      id: 7,
      name: 'Appeltaart',
      description: 'Huisgemaakte appeltaart met verse appels en kaneel',
      category: 'Gebak',
      isAvailable: true,
      imageUrl: '/images/Brood&banket.png'
    },
    {
      id: 8,
      name: 'Rijstevlaai',
      description: 'Traditionele rijstevlaai met romige vulling',
      category: 'Gebak',
      isAvailable: true,
      imageUrl: '/images/Brood&banket.png'
    },
    {
      id: 9,
      name: 'Kerststol',
      description: 'Traditionele kerststol met amandelspijs en rozijnen',
      category: 'Specialiteiten',
      isAvailable: false,
      imageUrl: '/images/Brood&banket.png'
    },
    {
      id: 10,
      name: 'Paasbrood',
      description: 'Heerlijk paasbrood met amandelspijs',
      category: 'Specialiteiten',
      isAvailable: false,
      imageUrl: '/images/Brood&banket.png'
    },
    {
      id: 11,
      name: 'Speculaas',
      description: 'Krokante speculaas met traditionele kruiden',
      category: 'Specialiteiten',
      isAvailable: true,
      imageUrl: '/images/Brood&banket.png'
    },
    {
      id: 12,
      name: 'Taart op Bestelling',
      description: 'Gepersonaliseerde taarten voor elke gelegenheid',
      category: 'Specialiteiten',
      isAvailable: true,
      imageUrl: '/images/Brood&banket.png'
    }
  ];

  private mockBakeryInfo: BakeryInfo = {
    name: 'Bakkerij Vanryckeghem',
    description: 'Ambachtelijke bakkerij sinds 1923, waar traditie en kwaliteit samenkomen',
    vatNumber: 'BE 0846.904.723',
    contact: {
      phone: '056 71 23 45',
      email: 'info@bakkerijvanryckeghem.be',
      address: {
        street: 'Overleiestraat',
        number: '38',
        city: 'Harelbeke',
        zip: '8530',
        country: 'België'
      }
    },
    openingHours: OPENING_HOURS,
    socialMedia: {
      facebook: 'https://facebook.com/bakkerijvanryckeghem'
    }
  };

  getProducts(): Product[] {
    return [...this.mockProducts];
  }

  getProductById(id: number): Product | undefined {
    return this.mockProducts.find(p => p.id === id);
  }

  getProductsByCategory(category: string): Product[] {
    return this.mockProducts.filter(p => p.category === category);
  }

  getBakeryInfo(): BakeryInfo {
    return { ...this.mockBakeryInfo };
  }

  getOpeningHours() {
    return [...OPENING_HOURS];
  }

  private mockFAQs: FAQItem[] = [
    {
      question: 'Hoe lang op voorhand moet ik bestellen?',
      answer: 'Voor dagelijkse producten zoals brood raden we aan om minstens een dag op voorhand te bestellen. Voor speciale bestellingen zoals taarten of grote hoeveelheden vragen we om minimaal 48 uur op voorhand contact met ons op te nemen.'
    },
    {
      question: 'Kan ik mijn bestelling nog wijzigen?',
      answer: 'U kunt uw bestelling wijzigen tot 24 uur voor het afhaaltijdstip. Neem hiervoor contact met ons op via telefoon of kom langs in de winkel. We helpen u graag verder.'
    },
    {
      question: 'Wat zijn de afhaal tijden?',
      answer: 'U kunt uw bestelling afhalen tijdens onze openingsuren: Dinsdag t/m vrijdag van 07:00 - 18:00, zaterdag van 07:00 - 16:00 en zondag van 07:00 - 13:00. Op maandag zijn we gesloten.'
    },
    {
      question: 'Kan ik ook glutenvrije producten bestellen?',
      answer: 'Ja, we hebben een selectie glutenvrije producten beschikbaar. Gelieve dit wel op voorhand door te geven bij uw bestelling, zodat we de beschikbaarheid kunnen garanderen.'
    },
    {
      question: 'Is er een minimum bestelbedrag?',
      answer: 'Nee, er is geen minimum bestelbedrag. U kunt bij ons al een enkel broodje bestellen. Voor grote bestellingen bieden we graag een aangepaste service.'
    }
  ];

  getFAQs(): FAQItem[] {
    return [...this.mockFAQs];
  }
}
