import { Component, inject } from '@angular/core';
import { ContentService } from '../../shared/services';

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
  openingHours = this.contentService.getOpeningHours();
}
