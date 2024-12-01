import { Component, inject, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { RouterModule } from '@angular/router';
import { CloudStorageService } from '../../services/cloudStorage.service';
import { GalleryTypeEnum } from '../../shared/dtos';

@Component({
  standalone: true,
  selector: 'about-me',
  imports: [RouterModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
  animations: [
    trigger('imageHover', [
      state(
        'normal',
        style({
          transform: 'scale(1)',
        })
      ),
      state(
        'hovered',
        style({
          transform: 'scale(0.875)',
        })
      ),
      transition('normal <=> hovered', animate('300ms ease-in-out')),
    ]),
  ],
})
export class AboutMeComponent {
  // readonly cloudService = inject(CloudStorageService);

  // ngOnInit() {
  //   this.loadImages();
  // }

  // async loadImages() {
  //   try {
  //     const images = await this.cloudService.fetchGalleryImagesLinks(
  //       GalleryTypeEnum.STUDIO
  //     );
  //     console.log('Images:', images);
  //   } catch (err) {
  //     console.error('Error loading images:', err);
  //   } finally {
  //     console.log('Images loaded');
  //   }
  // }
  imageState = 'normal';

  onHover() {
    this.imageState = 'hovered';
  }
  onLeave() {
    this.imageState = 'normal';
  }
}
