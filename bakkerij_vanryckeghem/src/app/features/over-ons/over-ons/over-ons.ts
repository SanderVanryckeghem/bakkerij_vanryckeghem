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

@Component({
  selector: 'app-over-ons',
  imports: [Hero],
  templateUrl: './over-ons.html',
  styleUrl: './over-ons.scss',
})
export class OverOns {
  team: TeamMember[] = [
    {
      name: 'Jan Vanryckeghem',
      role: 'Meester-Bakker',
      description: 'Al meer dan 40 jaar actief in de bakkerij. Jan is de spil van ons bedrijf en staat bekend om zijn perfectie en vakmanschap.'
    },
    {
      name: 'Marie Vanryckeghem',
      role: 'Patissier',
      description: 'Marie tovert dagelijks de mooiste taarten en gebakjes. Haar creativiteit en oog voor detail maken elk stuk uniek.'
    },
    {
      name: 'Tom Vanryckeghem',
      role: 'Bakker - Vierde Generatie',
      description: 'Tom vertegenwoordigt de vierde generatie en brengt frisse ideeën terwijl hij de familietraditie respecteert.'
    },
    {
      name: 'Sophie Vanryckeghem',
      role: 'Winkelverantwoordelijke',
      description: 'Sophie zorgt ervoor dat onze klanten zich altijd welkom voelen en helpt hen met een glimlach aan de perfecte keuze.'
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
