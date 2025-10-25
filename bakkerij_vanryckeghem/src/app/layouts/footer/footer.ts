import { Component } from '@angular/core';

interface OpeningHours {
  day: string;
  hours: string;
}

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  currentYear = new Date().getFullYear();

  openingHours: OpeningHours[] = [
    { day: 'Maandag', hours: 'Gesloten' },
    { day: 'Dinsdag', hours: '07:00 - 18:00' },
    { day: 'Woensdag', hours: '07:00 - 18:00' },
    { day: 'Donderdag', hours: '07:00 - 18:00' },
    { day: 'Vrijdag', hours: '07:00 - 18:00' },
    { day: 'Zaterdag', hours: '07:00 - 16:00' },
    { day: 'Zondag', hours: '07:00 - 13:00' },
  ];

  address = {
    street: 'Overleiestraat 38',
    city: 'Harelbeke',
    zip: '8530',
    country: 'België',
  };

  socialLinks = [
    {
      name: 'Facebook',
      url: 'https://facebook.com/bakkerijvanryckeghem',
      icon: 'facebook',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/bakkerijvanryckeghem',
      icon: 'instagram',
    },
  ];
}
