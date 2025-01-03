import { Component, computed, signal, inject, effect } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GalleryTypeEnum, GalleryTypeImagesType } from '../../shared/dtos';
import { CloudStorageService } from '../../services/cloudStorage.service';
import { firstValueFrom } from 'rxjs';
import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  standalone: true,
  selector: 'gallery-type',
  imports: [RouterModule],
  templateUrl: './gallery-type.component.html',
  styleUrls: ['./gallery-type.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
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
      this.error.set('Niečo sa nám pokazilo, ADMIN už o chybe viem a pracuje na jej vyriešení, skúste to o pár hodín opäť prosím'); // for now simple string
    } finally {
      this.loading.set(false);
    }
  }
}
