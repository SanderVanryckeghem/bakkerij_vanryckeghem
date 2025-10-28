import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../../../shared/components/hero/hero';
import { CategoryCard } from '../../../shared/components/category-card/category-card';
import { ContentService } from '../../../shared/services';

@Component({
  selector: 'app-home',
  imports: [Hero, CategoryCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private contentService = inject(ContentService);
  bakeryInfo = this.contentService.getBakeryInfo();
}
