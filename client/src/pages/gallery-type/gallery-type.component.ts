import { Component, computed, signal, inject, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryTypeImage, GalleryTypePage } from '../../shared/dtos';

@Component({
  selector: 'gallery-type',
  templateUrl: './gallery-type.component.html',
  styleUrls: ['./gallery-type.component.scss'],
})
export class GalleryTypeComponent {
  readonly route = inject(ActivatedRoute);
  private storageService = inject(StorageService);

  readonly type = computed(() => this.route.snapshot.paramMap.get('type'));
  readonly galleryData = signal<GalleryTypePage | null>(null);
  readonly images = signal<GalleryTypeImage[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    effect(() => {
      if (this.type()) {
        this.loadGalleryImages(this.type()!);
      }
    });
  }

  private async loadGalleryImages(type: string) {
    try {
      this.loading.set(true);
      this.error.set(null);

      const images = await this.storageService.getGalleryImages(type);
      this.images.set(images);
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      this.loading.set(false);
    }
  }
}
