import { Component, inject } from '@angular/core';
import { ContentService } from '../../shared/services';

interface CompactHours {
  days: string;
  hours: string;
  isClosed?: boolean;
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
  bakeryInfo = this.contentService.getBakeryInfo();

  compactOpeningHours: CompactHours[] = [
    { days: 'Maandag - Dinsdag', hours: 'Gesloten', isClosed: true },
    { days: 'Woensdag - Vrijdag', hours: '08:30 – 12:30 / 13:45 – 19:00' },
    { days: 'Zaterdag', hours: '08:15 – 12:30 / 13:45 – 19:00' },
    { days: 'Zondag', hours: '07:15 – 13:00' }
  ];
}
