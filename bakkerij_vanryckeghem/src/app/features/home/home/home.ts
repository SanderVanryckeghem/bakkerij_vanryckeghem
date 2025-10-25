import { Component } from '@angular/core';
import { Hero } from '../../../shared/components/hero/hero';
import { CategoryCard } from '../../../shared/components/category-card/category-card';

@Component({
  selector: 'app-home',
  imports: [Hero, CategoryCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
