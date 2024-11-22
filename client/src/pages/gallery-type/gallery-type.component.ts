import { Component, computed, signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryTypePage } from '../../shared/dtos';

@Component({
  selector: 'gallery-type',
  templateUrl: './gallery-type.component.html',
  styleUrls: ['./gallery-type.component.scss'],
})
export class GalleryTypeComponent {
  readonly route = inject(ActivatedRoute);

  readonly type = computed(() => this.route.snapshot.paramMap.get('type'));
  readonly galleryData = signal<GalleryTypePage | null>(null);
}
