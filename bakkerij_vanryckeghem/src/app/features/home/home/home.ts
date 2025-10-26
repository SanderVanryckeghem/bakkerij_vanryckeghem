import { Component, inject } from '@angular/core';
import { Hero } from '../../../shared/components/hero/hero';
import { CategoryCard } from '../../../shared/components/category-card/category-card';
import { ContentService } from '../../../shared/services';

@Component({
  selector: 'app-home',
  imports: [Hero, CategoryCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private contentService = inject(ContentService);
  bakeryInfo = this.contentService.getBakeryInfo();
  openingHours = this.contentService.getOpeningHours();
}
