import { Component, signal, computed, inject, ChangeDetectionStrategy, effect } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Hero } from '../../../shared/components';
import { ContentService } from '../../../shared/services';
import { CategoryFilter, CATEGORY_FILTERS } from '../../../shared/constants/categories';
import { SeoService } from '../../../core/services/seo.service';
import { AssetUrlPipe } from '../../../shared/pipes/asset-url.pipe';

@Component({
  selector: 'app-assortiment',
  imports: [Hero, AssetUrlPipe],
  templateUrl: './assortiment.html',
  styleUrl: './assortiment.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Assortiment {
  private contentService = inject(ContentService);
  private route = inject(ActivatedRoute);
  private seoService = inject(SeoService);
  private queryParams = toSignal(this.route.queryParams, { initialValue: {} as Params });

  selectedCategory = signal<CategoryFilter>('Alle');
  categories = CATEGORY_FILTERS;
  products = this.contentService.products;

  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    if (category === 'Alle') {
      return this.products();
    }
    return this.products().filter(p => p.category === category);
  });

  constructor() {
    this.seoService.updateMetaTags({
      title: 'Ons Assortiment - Bakkerij Vanryckeghem',
      description: 'Ontdek ons ruim assortiment aan ambachtelijk brood, gebak en ontbijtkoeken. Dagvers gebakken met de beste ingrediënten.',
      keywords: 'assortiment, brood, gebak, ontbijtkoeken, vers gebakken, ambachtelijk',
      url: 'https://www.bakkerijvanryckeghem.be/assortiment'
    });
  }

  private queryParamsEffect = effect(() => {
    const params = this.queryParams();
    const category = params['category'] as CategoryFilter;
    if (category && CATEGORY_FILTERS.includes(category)) {
      this.selectedCategory.set(category);
    }
  });

  selectCategory(category: CategoryFilter) {
    this.selectedCategory.set(category);
  }
}
