import {
  Component,
  computed,
  signal,
  inject,
  effect,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterModule,
} from '@angular/router';
import {
  GalleryTypeEnum,
  DisplayImage,
  GalleryTypeImageType,
} from '../../shared/dtos';
import { CloudStorageService } from '../../services/cloudStorage.service';
import { firstValueFrom } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

interface ColumnImages {
  columnIndex: number;
  images: DisplayImage[];
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
  readonly breakpointObserver = inject(BreakpointObserver);

  readonly routeParams = toSignal(this.route.paramMap, {
    requireSync: true,
  });
  readonly type = computed(() =>
    this.routeParams().get('type')
  );
  readonly variant = computed(() =>
    this.routeParams().get('variant')
  );
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
  // toSignal converts the observable into a signal — now isMobile is reactive
  readonly isMobile = toSignal(
    this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
      map(result => result.matches)
    ),
    { initialValue: false }
  );
  // Raw images from the API — just the data, no display logic here.
  readonly rawImages = signal<GalleryTypeImageType[]>([]);

  // columnImages is now fully derived — it reacts to both rawImages and isMobile.
  // No manual re-fetch needed when the device type changes; computed handles it.
  readonly columnImages = computed<ColumnImages[]>(() => {
    const images = this.rawImages();
    const mobile = this.isMobile();

    if (!images.length) return [];

    const columns: ColumnImages[] = Array.from(
      { length: this.COLUMN_COUNT() },
      (_, index) => ({ columnIndex: index, images: [] })
    );

    images.forEach((image, index) => {
      const width = mobile ? image.mobileWidth : image.width;
      const height = mobile ? image.mobileHeight : image.height;

      const displayImage: DisplayImage = {
        url: mobile ? image.mobileUrl : image.fullUrl,
        width: width ?? undefined,
        height: height ?? undefined,
        aspectRatio: width && height ? `${width} / ${height}` : undefined,
        originalFullUrl: image.fullUrl,
      };

      columns[index % this.COLUMN_COUNT()].images.push(displayImage);
    });

    return columns;
  });


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

  // loadGalleryImages is now lean — it only fetches and stores raw data.
  // All display logic has been lifted into the columnImages computed signal.
  private async loadGalleryImages(type: GalleryTypeEnum) {
    try {
      this.error.set(false);

      if (!this.validTypes.includes(type)) {
        this.error.set(true);
        return;
      }

      const images = await firstValueFrom(
        this.storageService.fetchGalleryImagesLinks(type)
      );

      // Storing raw images triggers columnImages to recompute with correct device URLs
      this.rawImages.set(images);
    } catch (error) {
      this.error.set(true);
    }
  }
}
