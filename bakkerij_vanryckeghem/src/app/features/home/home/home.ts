import { Component } from '@angular/core';
import { Hero } from '../../../shared/components/hero/hero';
import { Card } from '../../../shared/components/card/card';

@Component({
  selector: 'app-home',
  imports: [Hero, Card],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
