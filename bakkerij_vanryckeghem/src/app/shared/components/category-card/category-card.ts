import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-card',
  imports: [RouterLink],
  templateUrl: './category-card.html',
  styleUrl: './category-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCard {
  title = input.required<string>();
  description = input.required<string>();
  imageUrl = input<string>();
  routerLink = input<string>();
  queryParams = input<{ [key: string]: string }>();
}
