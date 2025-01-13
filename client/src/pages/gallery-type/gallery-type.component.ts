import { Component, computed, signal, inject, effect, AfterViewInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GalleryTypeEnum, GalleryTypeImageType } from '../../shared/dtos';
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
export class GalleryTypeComponent implements AfterViewInit {
  readonly route = inject(ActivatedRoute);
  private storageService = inject(CloudStorageService);

  readonly type = computed(() => this.route.snapshot.paramMap.get('type'));
  readonly images = signal<GalleryTypeImageType[]>([]);
  readonly loading = signal(true);
  readonly error = signal<boolean>(false);

  constructor() {
    // window.scrollTo(0, 0);

    effect(
      () => {
        if (this.type()) {
          this.loadGalleryImages(this.type() as GalleryTypeEnum);
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngAfterViewInit() { // scroll to top after view init, there was problem on mobile devices to not scroll to top properly, so this is workaround, works on IOS, Firefox, Chrome...
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 0);
  }

  private async loadGalleryImages(type: GalleryTypeEnum) {
    try {
      this.loading.set(true);
      this.error.set(false);

      const images = await firstValueFrom(
        // not right if it is good usage of firstValueFrom, but i need make promise from observable to store it in signal
        this.storageService.fetchGalleryImagesLinks(type)
      );
      this.images.set(images);
    } catch (error) {
      this.error.set(true);
    } finally {
      this.loading.set(false);
    }
  }
}
