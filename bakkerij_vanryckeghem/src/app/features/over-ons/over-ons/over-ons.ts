import { Component } from '@angular/core';
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
  imageUrl?: string;
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
export class OverOns {
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
      name: 'Rik Vanryckeghem',
      role: 'Meester-Bakker',
      description: 'Al meer dan 40 jaar actief in de bakkerij. Rik is de spil van ons bedrijf en staat bekend om zijn perfectie en vakmanschap.'
    },
    {
      name: 'Olivier Vanryckeghem',
      role: 'Patissier',
      description: 'Olivier tovert dagelijks de mooiste taarten en gebakjes. Haar creativiteit en oog voor detail maken elk stuk uniek.'
    },
    {
      name: 'Tamara Mahieu',
      role: 'Winkelverantwoordelijke',
      description: 'Tamara zorgt ervoor dat onze klanten zich altijd welkom voelen en helpt hen met een glimlach aan de perfecte keuze.'
    }
  ];

  timeline: TimelineEvent[] = [
    {
      year: '1923',
      title: 'De geboorte van een passie',
      description: 'Bakkerij Vanryckeghem werd opgericht door onze overgrootvader. Met eenvoudige middelen, maar met een enorme liefde voor het ambacht, legde hij de basis voor wat wij vandaag zijn.'
    },
    {
      year: '1950',
      title: 'Uitbreiding en innovatie',
      description: 'De tweede generatie breidde de bakkerij uit met nieuwe ovens en technieken, terwijl de traditionele recepten behouden bleven.'
    },
    {
      year: '1980',
      title: 'Familietraditie voortzetten',
      description: 'De derde generatie nam de leiding over en introduceerde nieuwe specialiteiten, steeds met respect voor de ambachtelijke traditie.'
    },
    {
      year: '2000',
      title: 'Modernisering met respect',
      description: 'We investeerden in moderne apparatuur zonder de ambachtelijke aanpak los te laten. Kwaliteit en smaak bleven centraal staan.'
    },
    {
      year: '2023',
      title: 'Een eeuw vakmanschap',
      description: 'Vandaag, 100 jaar later, bakken we nog steeds met dezelfde passie en toewijding als onze overgrootvader. De vierde generatie zet de traditie voort.'
    }
  ];
}
