import { Component, inject, signal, OnInit, ChangeDetectionStrategy, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../../../shared/components/hero/hero';
import { CategoryCard } from '../../../shared/components/category-card/category-card';
import { Popup } from '../../../shared/components/popup/popup';
import { ContentService } from '../../../shared/services';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-home',
  imports: [Hero, CategoryCard, RouterLink, Popup],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  private contentService = inject(ContentService);
  private seoService = inject(SeoService);
  bakeryInfo = this.contentService.bakeryInfo;
  categories = this.contentService.categories;
  faqs = this.contentService.faqs;
  popupConfig = this.contentService.popupConfig;
  openFaqIndex = signal<number | null>(null);
  showPopup = signal<boolean>(false);

  constructor() {
    effect(() => {
      const config = this.popupConfig();
      if (config?.show && this.isWithinSchedule(config.startDate, config.endDate)) {
        this.showPopup.set(true);
      }
    });
  }

  private isWithinSchedule(startDate?: string, endDate?: string): boolean {
    const now = new Date();

    if (startDate && new Date(startDate) > now) {
      return false;
    }

    if (endDate && new Date(endDate) < now) {
      return false;
    }

    return true;
  }

  closePopup(): void {
    this.showPopup.set(false);
  }

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

  ngOnInit() {
    this.seoService.updateMetaTags({
      title: 'Bakkerij Vanryckeghem - Brood & Gebak Harelbeke',
      description: 'Dagvers ambachtelijk brood, gebak en ontbijtkoeken uit Harelbeke. Familietraditie sinds de jaren \'40. Bezoek ons in de Overleiestraat 38.',
      keywords: 'bakkerij Harelbeke, ambachtelijk brood, vers gebak, ontbijtkoeken, taarten op bestelling',
      url: 'https://www.bakkerijvanryckeghem.be'
    });
  }
}
