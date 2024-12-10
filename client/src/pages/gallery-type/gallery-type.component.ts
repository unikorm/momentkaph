import { Component, computed, signal, inject, effect } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GalleryTypeEnum, GalleryTypeImagesType } from '../../shared/dtos';
import { CloudStorageService } from '../../services/cloudStorage.service';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'gallery-type',
  imports: [RouterModule],
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
    effect(
      () => {
        if (this.type()) {
          this.loadGalleryImages(this.type() as GalleryTypeEnum);
        }
      },
      { allowSignalWrites: true }
    );
  }

  private async loadGalleryImages(type: GalleryTypeEnum) {
    try {
      this.loading.set(true);
      this.error.set(null);

      const images = await firstValueFrom(
        this.storageService.fetchGalleryImagesLinks(type)
      );
      this.images.set(images);
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      this.loading.set(false);
    }
  }
}
