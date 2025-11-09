import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Hero } from '../../../shared/components';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

interface PhilosophyValue {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-over-ons',
  imports: [Hero],
  templateUrl: './over-ons.html',
  styleUrl: './over-ons.scss',
})
export class OverOns implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}
  philosophy: PhilosophyValue[] = [
    {
      title: 'Ambachtelijk',
      description: 'We maken alles met de hand, volgens traditionele methoden die generaties lang zijn verfijnd. Geen halffabricaten, alleen pure ingrediënten en vakmanschap.',
      icon: 'M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z'
    },
    {
      title: 'Kwaliteit',
      description: 'We kiezen bewust voor de beste ingrediënten van lokale leveranciers. Kwaliteit gaat bij ons altijd voor kwantiteit.',
      icon: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'
    },
    {
      title: 'Traditie',
      description: 'Onze recepten zijn met zorg doorgegeven van generatie op generatie. We koesteren deze erfenis en geven ze door aan onze kinderen.',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
    },
    {
      title: 'Passie',
      description: 'Elke ochtend starten we met dezelfde liefde voor ons vak. Die passie proef je terug in elk broodje, elke taart, elk koekje.',
      icon: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
    }
  ];

  team: TeamMember[] = [
    {
      name: 'Olivier Vanryckeghem',
      role: 'Bakker',
      description: 'Olivier tovert dagelijks de mooiste taarten en gebakjes. zijn creativiteit en oog voor detail maken elk stuk uniek.',
      imageUrl: '/images/team/olivier_cartoon.png'
    },
    {
      name: 'Tamara Mahieu',
      role: 'Winkelverantwoordelijke',
      description: 'Tamara zorgt ervoor dat onze klanten zich altijd welkom voelen en helpt hen met een glimlach aan de perfecte keuze.',
      imageUrl: '/images/team/tamara_cartoon.png'
    }
  ];

  timeline: TimelineEvent[] = [
    {
      year: 'Jaren \'40',
      title: 'Het begin van een familieverhaal',
      description: 'In de jaren veertig leggen grootvader André en grootmoeder Elisabeth de basis van wat later een gevestigde naam zou worden in de streek. Ze starten een kleine bakkerij en kruidenierszaak, waar alles nog ambachtelijk wordt gemaakt. Het was een echte familiezaak, met hard werk en veel passie voor het bakkersvak.'
    },
    {
      year: 'Jaren \'90',
      title: 'Groei en vernieuwing',
      description: 'Doorheen de jaren groeit het klantenbestand gestaag. De kwaliteit en het vakmanschap van de bakkerij worden steeds meer gewaardeerd, waardoor het werk toeneemt. In 1993 sluit zoon Olivier zich aan bij de familiezaak. Dat markeert een belangrijke stap in de verdere professionalisering van de bakkerij. Om de groei bij te benen, wordt de bakkerij volledig vernieuwd en uitgerust met een moderne infrastructuur. Zo kunnen ze blijven voldoen aan de stijgende vraag, zonder hun ambachtelijke karakter te verliezen.'
    },
    {
      year: '2012',
      title: 'De derde generatie aan het roer',
      description: 'Na vele jaren hard werk dragen Eric en Christelle met trots de fakkel over aan hun zoon Olivier en zijn partner Tamara. Met deze derde generatie blijft de familiegeschiedenis van Bakkerij Vanryckeghem verder leven. Olivier en Tamara zetten sterk in op kwaliteit, versheid en een warm contact met hun klanten. Ze bouwen voort op de traditie die door de vorige generaties werd gelegd, maar brengen tegelijk een moderne aanpak en een frisse visie in de zaak.'
    },
    {
      year: 'Vandaag',
      title: 'Geworteld in traditie',
      description: 'Bakkerij Vanryckeghem staat nog altijd bekend als een authentieke familiebakkerij, geworteld in traditie maar met oog voor vernieuwing. Generatie na generatie blijft dezelfde passie voor brood, gebak en ambacht centraal staan.'
    }
  ];

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('timeline-item-visible');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const timelineItems = this.elementRef.nativeElement.querySelectorAll('.timeline-item');
    timelineItems.forEach((item: Element) => observer.observe(item));
  }
}
