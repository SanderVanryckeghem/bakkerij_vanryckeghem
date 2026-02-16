import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

declare let gtag: Function;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private router = inject(Router);

  init(): void {
    this.trackPageViews();
    this.trackInitialPageView();
  }

  private trackPageViews(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.sendPageView(event.urlAfterRedirects);
      });
  }

  private trackInitialPageView(): void {
    this.sendPageView(this.router.url);
  }

  private sendPageView(url: string): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_path: url,
        page_location: window.location.origin + url,
      });
    }
  }
}
