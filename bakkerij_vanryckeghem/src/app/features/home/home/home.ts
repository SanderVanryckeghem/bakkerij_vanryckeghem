import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../../../shared/components/hero/hero';
import { CategoryCard } from '../../../shared/components/category-card/category-card';
import { ContentService } from '../../../shared/services';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-home',
  imports: [Hero, CategoryCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private contentService = inject(ContentService);
  private seoService = inject(SeoService);
  bakeryInfo = this.contentService.getBakeryInfo();
  categories = this.contentService.getCategories();
  faqItems = this.contentService.getFAQs();
  openFaqIndex = signal<number | null>(null);

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
      title: 'Bakkerij Vanryckeghem - Ambachtelijk Brood & Gebak in Harelbeke',
      description: 'Dagvers ambachtelijk brood, gebak en ontbijtkoeken uit Harelbeke. Familietraditie sinds de jaren \'40. Bezoek ons in de Overleiestraat 38.',
      keywords: 'bakkerij Harelbeke, ambachtelijk brood, vers gebak, ontbijtkoeken, taarten op bestelling',
      url: 'https://www.bakkerijvanryckeghem.be'
    });
  }
}
