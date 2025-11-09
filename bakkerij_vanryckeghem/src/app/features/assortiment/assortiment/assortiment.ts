import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../../shared/components';
import { ContentService } from '../../../shared/services';
import { CategoryFilter, CATEGORY_FILTERS } from '../../../shared/constants/categories';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-assortiment',
  imports: [Hero],
  templateUrl: './assortiment.html',
  styleUrl: './assortiment.scss',
})
export class Assortiment implements OnInit {
  private contentService = inject(ContentService);
  private route = inject(ActivatedRoute);
  private seoService = inject(SeoService);

  selectedCategory = signal<CategoryFilter>('Alle');
  categories = CATEGORY_FILTERS;
  products = this.contentService.getProducts();

  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    if (category === 'Alle') {
      return this.products;
    }
    return this.products.filter(p => p.category === category);
  });

  ngOnInit() {
    this.seoService.updateMetaTags({
      title: 'Ons Assortiment - Bakkerij Vanryckeghem',
      description: 'Ontdek ons ruim assortiment aan ambachtelijk brood, gebak en ontbijtkoeken. Dagvers gebakken met de beste ingrediënten.',
      keywords: 'assortiment, brood, gebak, ontbijtkoeken, vers gebakken, ambachtelijk',
      url: 'https://www.bakkerijvanryckeghem.be/assortiment'
    });

    this.route.queryParams.subscribe(params => {
      const category = params['category'] as CategoryFilter;
      if (category && CATEGORY_FILTERS.includes(category)) {
        this.selectedCategory.set(category);
      }
    });
  }

  selectCategory(category: CategoryFilter) {
    this.selectedCategory.set(category);
  }
}

/*
  OLD_products: Product[] = [
    {
      id: 1,
      name: 'Wit Brood',
      description: 'Klassiek wit brood, knapperig van buiten en zacht van binnen',
      category: 'Brood'
    },
    {
      id: 2,
      name: 'Volkoren Brood',
      description: 'Gezond en voedzaam volkoren brood met een heerlijke smaak',
      category: 'Brood'
    },
    {
      id: 3,
      name: 'Meergranen Brood',
      description: 'Rijk meergranenbrood met zaden en pitten',
      category: 'Brood'
    },
    {
      id: 4,
      name: 'Desem Brood',
      description: 'Traditioneel desembrood met een unieke smaak',
      category: 'Brood'
    },
    {
      id: 5,
      name: 'Croissant',
      description: 'Boterrijke croissant, elke ochtend vers gebakken',
      category: 'Gebak'
    },
    {
      id: 6,
      name: 'Chocoladekoek',
      description: 'Smeuïge chocoladekoek met pure chocolade',
      category: 'Gebak'
    },
    {
      id: 7,
      name: 'Appeltaart',
      description: 'Huisgemaakte appeltaart met verse appels en kaneel',
      category: 'Gebak'
    },
    {
      id: 8,
      name: 'Rijstevlaai',
      description: 'Traditionele rijstevlaai met romige vulling',
      category: 'Gebak'
    },
    {
      id: 9,
      name: 'Kerststol',
      description: 'Traditionele kerststol met amandelspijs en rozijnen',
      category: 'Specialiteiten'
    },
    {
      id: 10,
      name: 'Paasbrood',
      description: 'Heerlijk paasbrood met amandelspijs',
      category: 'Specialiteiten'
    },
    {
      id: 11,
      name: 'Speculaas',
      description: 'Krokante speculaas met traditionele kruiden',
      category: 'Specialiteiten'
    },
    {
      id: 12,
      name: 'Taart op Bestelling',
      description: 'Gepersonaliseerde taarten voor elke gelegenheid',
      category: 'Specialiteiten'
    }
  ];

*/
