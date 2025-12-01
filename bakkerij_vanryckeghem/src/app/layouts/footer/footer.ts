import { Component, inject, computed } from '@angular/core';
import { ContentService } from '../../shared/services';

interface CompactHours {
  days: string;
  hours: string;
  isClosed?: boolean;
  isToday?: boolean;
}

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private contentService = inject(ContentService);

  currentYear = new Date().getFullYear();
  bakeryInfo = this.contentService.bakeryInfo;

  compactOpeningHours = computed<CompactHours[]>(() => {
    const hours = this.contentService.openingHours();
    if (!hours.length) return [];

    const today = new Date().getDay();

    const monday = hours.find(h => h.day === 'Maandag');
    const wednesday = hours.find(h => h.day === 'Woensdag');
    const saturday = hours.find(h => h.day === 'Zaterdag');
    const sunday = hours.find(h => h.day === 'Zondag');

    return [
      {
        days: 'Maandag - Dinsdag',
        hours: monday?.hours || 'Gesloten',
        isClosed: monday?.isClosed ?? true,
        isToday: today === 1 || today === 2
      },
      {
        days: 'Woensdag - Vrijdag',
        hours: wednesday?.hours || '',
        isToday: today === 3 || today === 4 || today === 5
      },
      {
        days: 'Zaterdag',
        hours: saturday?.hours || '',
        isToday: today === 6
      },
      {
        days: 'Zondag',
        hours: sunday?.hours || '',
        isToday: today === 0
      }
    ];
  });
}
