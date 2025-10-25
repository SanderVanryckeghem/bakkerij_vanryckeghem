import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home/home').then((m) => m.Home),
  },
  {
    path: 'assortiment',
    loadComponent: () =>
      import('./features/assortiment/assortiment/assortiment').then(
        (m) => m.Assortiment
      ),
  },
  {
    path: 'over-ons',
    loadComponent: () =>
      import('./features/over-ons/over-ons/over-ons').then((m) => m.OverOns),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact/contact').then((m) => m.Contact),
  },
  {
    path: 'bestellen',
    loadComponent: () =>
      import('./features/bestellen/bestellen/bestellen').then(
        (m) => m.Bestellen
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found/not-found').then(
        (m) => m.NotFound
      ),
  },
];
