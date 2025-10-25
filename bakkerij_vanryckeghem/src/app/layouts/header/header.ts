import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  mobileMenuOpen = signal(false);

  navItems: NavItem[] = [
    { label: 'Home', route: '/' },
    { label: 'Assortiment', route: '/assortiment' },
    { label: 'Over Ons', route: '/over-ons' },
    { label: 'Contact', route: '/contact' },
    { label: 'Hoe Bestellen?', route: '/bestellen' },
  ];

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(value => !value);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
