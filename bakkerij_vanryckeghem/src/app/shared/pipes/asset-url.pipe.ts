import { Pipe, PipeTransform, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Pipe({
  name: 'assetUrl',
  standalone: true
})
export class AssetUrlPipe implements PipeTransform {
  private document = inject(DOCUMENT);

  transform(path: string): string {
    if (!path) return '';
    const baseHref = this.document.baseURI || '/';
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return baseHref + cleanPath;
  }
}
