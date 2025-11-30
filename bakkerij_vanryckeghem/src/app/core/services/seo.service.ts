import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private meta = inject(Meta);
  private titleService = inject(Title);

  private defaultMeta: PageMeta = {
    title: 'Bakkerij Vanryckeghem - Ambachtelijk Brood & Gebak in Harelbeke',
    description: 'Ambachtelijke bakkerij in Harelbeke sinds de jaren \'40. Dagvers brood, gebak en ontbijtkoeken. Bezoek ons in de Overleiestraat 38.',
    keywords: 'bakkerij, Harelbeke, brood, gebak, ambachtelijk, ontbijtkoeken, taarten, Vanryckeghem',
    image: '/images/bakery/logo_vanryckeghem.png',
    url: 'https://www.bakkerijvanryckeghem.be'
  };

  updateMetaTags(pageMeta: Partial<PageMeta>): void {
    const meta = { ...this.defaultMeta, ...pageMeta };

    this.titleService.setTitle(meta.title);

    this.meta.updateTag({ name: 'description', content: meta.description });
    if (meta.keywords) {
      this.meta.updateTag({ name: 'keywords', content: meta.keywords });
    }

    this.meta.updateTag({ property: 'og:title', content: meta.title });
    this.meta.updateTag({ property: 'og:description', content: meta.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    if (meta.image) {
      this.meta.updateTag({ property: 'og:image', content: meta.image });
    }
    if (meta.url) {
      this.meta.updateTag({ property: 'og:url', content: meta.url });
    }

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: meta.title });
    this.meta.updateTag({ name: 'twitter:description', content: meta.description });
    if (meta.image) {
      this.meta.updateTag({ name: 'twitter:image', content: meta.image });
    }
  }

  addStructuredData(data: object): void {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }
}
