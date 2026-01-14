import {
  Component,
  computed,
  signal,
  inject,
  effect,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterModule,
} from '@angular/router';
import {
  GalleryTypeEnum,
  GalleryTypeImageType,
} from '../../shared/dtos';
import { CloudStorageService } from '../../services/cloudStorage.service';
import { firstValueFrom } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

interface ColumnImages {
  columnIndex: number;
  images: GalleryTypeImageType[];
}

@Component({
  selector: 'gallery-type',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './gallery-type.component.html',
  styleUrls: ['./gallery-type.component.scss'],
})
export class GalleryTypeComponent implements OnInit {
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly storageService = inject(CloudStorageService);

  readonly routeParams = toSignal(this.route.paramMap, {
    requireSync: true,
  });
  readonly type = computed(() =>
    this.routeParams().get('type')
  );
  readonly variant = computed(() =>
    this.routeParams().get('variant')
  );
  readonly columnImages = signal<ColumnImages[]>([]);
  readonly COLUMN_COUNT = signal<number>(3);
  readonly error = signal<boolean>(false);
  readonly validTypes = Object.values(GalleryTypeEnum);
  readonly currentTipIndex = signal<number>(0);
  readonly totalTips = 7;
  readonly isAtStart = computed(
    () => this.currentTipIndex() === 0
  );
  readonly isAtEnd = computed(
    () => this.currentTipIndex() === this.totalTips
  );

  constructor() {
    effect(
      () => {
        this.loadGalleryImages(
          this.type() === 'babies'
            ? (this.variant() as GalleryTypeEnum)
            : (this.type() as GalleryTypeEnum)
        );
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit() {
    if (
      !this.validTypes.includes(
        this.type() === 'babies'
          ? (this.variant() as GalleryTypeEnum)
          : (this.type() as GalleryTypeEnum)
      )
    ) {
      this.router.navigate(['/404']);
    }

    // test this if it works to scroll to top as simplier solution
    // window.scrollTo(0, 0)
  }

  ngAfterViewInit() {
    // scroll to top after view init, there was problem on mobile devices to not scroll to top properly, so this is workaround, works on IOS, Firefox, Chrome...
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 0);
  }

  // Navigation methods
  navigateToNextTip(): void {
    if (this.currentTipIndex() < this.totalTips) {
      this.currentTipIndex.update((index) => index + 1);
      this.scrollToCurrentTip();
    }
  }

  navigateToPreviousTip(): void {
    if (this.currentTipIndex() > 0) {
      this.currentTipIndex.update((index) => index - 1);
      this.scrollToCurrentTip();
    }
  }

  private scrollToCurrentTip(): void {
    const tipElements = document.querySelectorAll('.tip');
    if (tipElements[this.currentTipIndex()]) {
      tipElements[this.currentTipIndex()].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }

  private async loadGalleryImages(type: GalleryTypeEnum) {
    try {
      this.error.set(false);

      if (!this.validTypes.includes(type)) {
        this.error.set(true);
        return;
      }

      const images = await firstValueFrom(
        // not right if it is good usage of firstValueFrom, but i need make promise from observable to store it in signal
        this.storageService.fetchGalleryImagesLinks(type)
      );
      const columns: ColumnImages[] = Array.from(
        { length: this.COLUMN_COUNT() },
        (_, index) => ({
          columnIndex: index,
          images: [],
        })
      );

      images.forEach((image, index) => {
        columns[index % this.COLUMN_COUNT()].images.push(
          image
        );
      });

      this.columnImages.set(columns);
    } catch (error) {
      this.error.set(true);
    }
  }
}
