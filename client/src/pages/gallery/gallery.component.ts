import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { GALLERY_REVIEWS } from '../../shared/gallery-reviews.data';

@Component({
    selector: 'gallery',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.scss',
    animations: [
        trigger('imageHover', [
            state('normal', style({
                transform: 'scale(1)',
            })),
            state('hovered', style({
                transform: 'scale(0.81)',
            })),
            transition('normal <=> hovered', animate('300ms ease-in-out')),
        ]),
    ]
})
export class GalleryComponent {
  readonly languageService = inject(LanguageService)

  readonly allReviews = signal<string[]>(GALLERY_REVIEWS);

  imageStates = signal<{ [key: string]: string }>({
    weddings: 'normal',
    'love-story': 'normal',
    pregnancy: 'normal',
    family: 'normal',
    studio: 'normal',
    baptism: 'normal',
    portrait: 'normal',
  });

  onHover(section: string) {
    this.imageStates.update(states => {
      return {
        ...states,
        [section]: 'hovered',
      };
    })
  }
  onLeave(section: string) {
    this.imageStates.update(states => {
      return {
        ...states,
        [section]: 'normal',
      }
    });
  }

  toggleState(section: string) {
    this.imageStates.update(states => {
      return {
        ...states,
        [section]: states[section] === 'normal' ? 'hovered' : 'normal',
      };
    })
  }
}
