import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  disabled = input<boolean>(false);
  fullWidth = input<boolean>(false);
  type = input<'button' | 'submit' | 'reset'>('button');

  get buttonClasses(): string {
    const baseClasses = 'btn';
    const variantClass = `btn-${this.variant()}`;
    const sizeClass = `btn-${this.size()}`;
    const widthClass = this.fullWidth() ? 'w-full' : '';

    return [baseClasses, variantClass, sizeClass, widthClass].filter(Boolean).join(' ');
  }
}
