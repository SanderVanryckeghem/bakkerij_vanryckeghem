import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../button/button';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, Button],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  title = input.required<string>();
  subtitle = input<string>();
  ctaText = input<string>();
  ctaLink = input<string>();
  backgroundImage = input<string>();
}
