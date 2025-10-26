import { Component } from '@angular/core';
import { Hero } from '../../../shared/components';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-over-ons',
  imports: [Hero],
  templateUrl: './over-ons.html',
  styleUrl: './over-ons.scss',
})
export class OverOns {
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
