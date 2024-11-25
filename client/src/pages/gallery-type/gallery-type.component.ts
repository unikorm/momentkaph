import { Component, computed, signal, inject, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryTypeEnum, GalleryTypeImagesType } from '../../shared/dtos';
import { CloudStorageService } from '../../services/cloudStorage.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'gallery-type',
  templateUrl: './gallery-type.component.html',
  styleUrls: ['./gallery-type.component.scss'],
})
export class GalleryTypeComponent {
  readonly route = inject(ActivatedRoute);
  private storageService = inject(CloudStorageService);

  readonly type = computed(() => this.route.snapshot.paramMap.get('type'));
  readonly images = signal<GalleryTypeImagesType[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    effect(() => {
      if (this.type()) {
        this.loadGalleryImages(this.type()! as GalleryTypeEnum);
      }
    });
  }

  private async loadGalleryImages(type: GalleryTypeEnum) {
    try {
      this.loading.set(true);
      this.error.set(null);

      const images = await this.storageService.fetchGalleryImagesLinks(type);
      const imagesSignal = toSignal(images);
      this.images.set(imagesSignal as unknown as GalleryTypeImagesType[]);
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      this.loading.set(false);
    }
  }
}
