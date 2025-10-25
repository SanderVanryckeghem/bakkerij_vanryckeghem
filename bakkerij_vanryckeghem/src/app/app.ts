import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from './shared/components/button/button';
import { Card } from './shared/components/card/card';
import { Header } from './layouts/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button, Card, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
