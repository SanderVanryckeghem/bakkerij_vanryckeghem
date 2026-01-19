import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.html',
  styleUrl: './popup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Popup {
  title = input<string>('');
  message = input<string>('');
  buttonText = input<string>('Sluiten');
  closed = output<void>();

  close(): void {
    this.closed.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
