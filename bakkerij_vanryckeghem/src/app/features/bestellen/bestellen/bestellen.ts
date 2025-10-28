import { Component, signal } from '@angular/core';
import { Hero } from '../../../shared/components';

interface OrderingMethod {
  title: string;
  description: string;
  icon: string;
  actionText?: string;
  actionLink?: string;
  details?: string[];
}

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-bestellen',
  imports: [Hero],
  templateUrl: './bestellen.html',
  styleUrl: './bestellen.scss',
})
export class Bestellen {
  openFaqIndex = signal<number | null>(null);

  faqItems: FAQItem[] = [
    {
      question: 'Hoe lang op voorhand moet ik bestellen?',
      answer: 'Voor dagelijkse producten zoals brood raden we aan om minstens een dag op voorhand te bestellen. Voor speciale bestellingen zoals taarten of grote hoeveelheden vragen we om minimaal 48 uur op voorhand contact met ons op te nemen.',
      isOpen: false
    },
    {
      question: 'Kan ik mijn bestelling nog wijzigen?',
      answer: 'U kunt uw bestelling wijzigen tot 24 uur voor het afhaaltijdstip. Neem hiervoor contact met ons op via telefoon of kom langs in de winkel. We helpen u graag verder.',
      isOpen: false
    },
    {
      question: 'Wat zijn de afhaal tijden?',
      answer: 'U kunt uw bestelling afhalen tijdens onze openingsuren: Dinsdag t/m vrijdag van 07:00 - 18:00, zaterdag van 07:00 - 16:00 en zondag van 07:00 - 13:00. Op maandag zijn we gesloten.',
      isOpen: false
    },
    {
      question: 'Kan ik ook glutenvrije producten bestellen?',
      answer: 'Ja, we hebben een selectie glutenvrije producten beschikbaar. Gelieve dit wel op voorhand door te geven bij uw bestelling, zodat we de beschikbaarheid kunnen garanderen.',
      isOpen: false
    },
    {
      question: 'Is er een minimum bestelbedrag?',
      answer: 'Nee, er is geen minimum bestelbedrag. U kunt bij ons al een enkel broodje bestellen. Voor grote bestellingen bieden we graag een aangepaste service.',
      isOpen: false
    }
  ];

  orderingMethods: OrderingMethod[] = [
    {
      title: 'Telefonisch',
      description: 'Bel ons op en bestel eenvoudig telefonisch. Wij helpen u graag met uw bestelling.',
      icon: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
      actionText: '056 71 23 45',
      actionLink: 'tel:056712345'
    },
    {
      title: 'In de Winkel',
      description: 'Kom gerust langs in onze winkel. U kunt ook ter plaatse bestellen voor later ophalen.',
      icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
      details: ['Overleiestraat 38', '8530 Harelbeke'],
      actionText: 'Bekijk op kaart',
      actionLink: 'https://maps.google.com/?q=Overleiestraat+38+8530+Harelbeke'
    }
  ];

  toggleFaq(index: number) {
    if (this.openFaqIndex() === index) {
      this.openFaqIndex.set(null);
    } else {
      this.openFaqIndex.set(index);
    }
  }

  isFaqOpen(index: number): boolean {
    return this.openFaqIndex() === index;
  }
}
