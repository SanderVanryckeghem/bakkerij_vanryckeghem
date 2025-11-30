import { Component, inject } from '@angular/core';
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

  compactOpeningHours: CompactHours[] = this.getCompactHours();

  private getCompactHours(): CompactHours[] {
    const today = new Date().getDay();

    return [
      {
        days: 'Maandag - Dinsdag',
        hours: 'Gesloten',
        isClosed: true,
        isToday: today === 1 || today === 2
      },
      {
        days: 'Woensdag - Vrijdag',
        hours: '08:30 – 12:30 / 13:45 – 19:00',
        isToday: today === 3 || today === 4 || today === 5
      },
      {
        days: 'Zaterdag',
        hours: '08:15 – 12:30 / 13:45 – 19:00',
        isToday: today === 6
      },
      {
        days: 'Zondag',
        hours: '07:15 – 13:00',
        isToday: today === 0
      }
    ];
  }
}
