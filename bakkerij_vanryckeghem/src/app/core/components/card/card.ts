import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [NgClass],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  hoverable = input<boolean>(true);
  padding = input<'sm' | 'md' | 'lg'>('md');

  get cardClasses(): string {
    const baseClass = 'card';
    const hoverClass = this.hoverable() ? 'card-hoverable' : '';
    const paddingClass = `card-padding-${this.padding()}`;

    return [baseClass, hoverClass, paddingClass].filter(Boolean).join(' ');
  }
}
