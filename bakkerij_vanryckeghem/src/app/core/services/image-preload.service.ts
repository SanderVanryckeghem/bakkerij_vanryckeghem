import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ImagePreloadService {
  private document = inject(DOCUMENT);
  private preloadedImages = new Set<string>();

  preloadImages(imagePaths: string[]): void {
    const baseHref = this.document.baseURI || '/';

    imagePaths.forEach(path => {
      if (!path || this.preloadedImages.has(path)) return;

      const cleanPath = path.startsWith('/') ? path.slice(1) : path;
      const fullUrl = baseHref + cleanPath;

      const img = new Image();
      img.src = fullUrl;
      this.preloadedImages.add(path);
    });
  }
}
