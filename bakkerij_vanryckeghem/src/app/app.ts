import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from './shared/components/button/button';
import { Card } from './shared/components/card/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button, Card],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
