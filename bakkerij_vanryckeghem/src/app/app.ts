import { Component, inject, effect, ChangeDetectionStrategy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Header } from './layouts/header/header';
import { Footer } from './layouts/footer/footer';
import { SeoService } from './core/services/seo.service';
import { ContentService } from './shared/services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private seoService = inject(SeoService);
  private contentService = inject(ContentService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events
        .pipe(filter((event) => event instanceof NavigationStart || event instanceof NavigationEnd))
        .subscribe(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        });
    }
  }

  private structuredDataEffect = effect(() => {
    const bakeryInfo = this.contentService.bakeryInfo();
    if (!bakeryInfo) return;

    const openingHours = this.contentService.openingHours();

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Bakery',
      'name': bakeryInfo.name,
      'description': bakeryInfo.description,
      'url': 'https://www.bakkerijvanryckeghem.be',
      'telephone': bakeryInfo.contact.phone,
      'email': bakeryInfo.contact.email,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': `${bakeryInfo.contact.address.street} ${bakeryInfo.contact.address.number}`,
        'addressLocality': bakeryInfo.contact.address.city,
        'postalCode': bakeryInfo.contact.address.zip,
        'addressCountry': 'BE'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': '50.8515',
        'longitude': '3.3105'
      },
      'openingHoursSpecification': openingHours.map(hour => ({
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': this.getDayOfWeek(hour.day),
        'opens': hour.isClosed ? undefined : hour.hours.split(' - ')[0],
        'closes': hour.isClosed ? undefined : hour.hours.split(' - ')[1]
      })).filter(spec => spec.opens),
      'priceRange': '€',
      'servesCuisine': 'Belgian',
      'image': 'https://www.bakkerijvanryckeghem.be/images/bakery/logo_vanryckeghem.png',
      'sameAs': bakeryInfo.socialMedia?.facebook ? [
        bakeryInfo.socialMedia.facebook
      ] : []
    };

    this.seoService.addStructuredData(structuredData);
  });

  private getDayOfWeek(day: string): string {
    const dayMap: { [key: string]: string } = {
      'Maandag': 'Monday',
      'Dinsdag': 'Tuesday',
      'Woensdag': 'Wednesday',
      'Donderdag': 'Thursday',
      'Vrijdag': 'Friday',
      'Zaterdag': 'Saturday',
      'Zondag': 'Sunday'
    };
    return dayMap[day] || day;
  }
}
