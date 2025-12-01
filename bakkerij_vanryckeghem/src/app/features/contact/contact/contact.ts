import { Component, inject, OnInit, computed, ChangeDetectionStrategy } from '@angular/core';
import { Hero } from '../../../shared/components';
import { ContentService } from '../../../shared/services';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-contact',
  imports: [Hero],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact implements OnInit {
  private contentService = inject(ContentService);
  private seoService = inject(SeoService);
  bakeryInfo = this.contentService.bakeryInfo;

  contactInfo = computed(() => {
    const info = this.bakeryInfo();
    if (!info) return [];

    return [
      {
        type: 'address',
        label: 'Adres',
        value: `${info.contact.address.street} ${info.contact.address.number}, ${info.contact.address.zip} ${info.contact.address.city}`,
        icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
        link: `https://maps.google.com/?q=${info.contact.address.street}+${info.contact.address.number}+${info.contact.address.zip}+${info.contact.address.city}`
      },
      {
        type: 'phone',
        label: 'Telefoon',
        value: info.contact.phone,
        icon: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
        link: `tel:${info.contact.phone.replace(/\s/g, '')}`
      },
      {
        type: 'email',
        label: 'E-mail',
        value: info.contact.email,
        icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
        link: `mailto:${info.contact.email}`
      }
    ];
  });

  openingHours = computed(() => {
    const hours = this.contentService.openingHours();
    const today = new Date().getDay();

    return hours.map((hour, index) => ({
      ...hour,
      isToday: index === (today === 0 ? 6 : today - 1)
    }));
  });

  ngOnInit() {
    this.seoService.updateMetaTags({
      title: 'Contact - Bakkerij Vanryckeghem | Overleiestraat 38, Harelbeke',
      description: 'Neem contact op met Bakkerij Vanryckeghem. Bezoek ons in de Overleiestraat 38, Harelbeke of bel ons op 056 71 23 45.',
      keywords: 'contact, adres, openingsuren, telefoon, Harelbeke, Overleiestraat',
      url: 'https://www.bakkerijvanryckeghem.be/contact'
    });
  }
}
