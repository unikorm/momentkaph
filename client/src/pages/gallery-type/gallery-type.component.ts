import { Component, computed, signal, inject, effect, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GalleryTypeEnum, GalleryTypeImageType } from '../../shared/dtos';
import { CloudStorageService } from '../../services/cloudStorage.service';
import { firstValueFrom } from 'rxjs';
import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';

interface ColumnImages {
  columnIndex: number;
  images: GalleryTypeImageType[];
}

@Component({
  standalone: true,
  selector: 'gallery-type',
  imports: [RouterModule],
  templateUrl: './gallery-type.component.html',
  styleUrls: ['./gallery-type.component.scss'],
})
export class GalleryTypeComponent implements OnInit, AfterViewInit {
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly storageService = inject(CloudStorageService);

  readonly type = computed(() => this.route.snapshot.paramMap.get('type'));
  readonly columnImages = signal<ColumnImages[]>([]);
  readonly COLUMN_COUNT = signal<number>(3);
  readonly loading = signal(true);
  readonly error = signal<boolean>(false);
  readonly validTypes = Object.values(GalleryTypeEnum);

  constructor(
  ) {
    effect(
      () => {
        if (this.type()) {
          this.loadGalleryImages(this.type() as GalleryTypeEnum);
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit() {
    if (!this.validTypes.includes(this.type() as GalleryTypeEnum)) {
      this.router.navigate(['/404']);
    }
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
      const columns: ColumnImages[] = Array.from({ length: this.COLUMN_COUNT() }, (_, index) => ({
        columnIndex: index,
        images: []
      }));

      images.forEach((image, index) => {
        columns[index % this.COLUMN_COUNT()].images.push(image);
      });

      this.columnImages.set(columns);
    } catch (error) {
      this.error.set(true);
    } finally {
      this.loading.set(false);
    }
  }
}
