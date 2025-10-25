import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-card',
  imports: [RouterLink],
  templateUrl: './category-card.html',
  styleUrl: './category-card.scss',
})
export class CategoryCard {
  title = input.required<string>();
  description = input.required<string>();
  imageUrl = input<string>();
  link = input<string>();
}
