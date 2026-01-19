import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'assortiment',
    loadComponent: () =>
      import('./pages/assortiment/assortiment').then(
        (m) => m.Assortiment
      ),
  },
  {
    path: 'over-ons',
    loadComponent: () =>
      import('./pages/over-ons/over-ons').then((m) => m.OverOns),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact').then((m) => m.Contact),
  },
  {
    path: 'bestellen',
    loadComponent: () =>
      import('./pages/bestellen/bestellen').then(
        (m) => m.Bestellen
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found').then(
        (m) => m.NotFound
      ),
  },
];
