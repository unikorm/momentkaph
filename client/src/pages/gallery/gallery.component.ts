import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, computed, inject, signal } from '@angular/core';
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
  readonly allReviews = GALLERY_REVIEWS.map(r => ({ content: r.content, author: r.author }));
  readonly currentReviewIndex = signal<number>(0);
  readonly totalReviews = GALLERY_REVIEWS.length;
  readonly isAtStart = computed(
    () => this.currentReviewIndex() === 0
  );
  readonly isAtEnd = computed(
    () => this.currentReviewIndex() === this.totalReviews - 1
  );

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

  // Navigation methods
  navigateToNextReview(): void {
    if (this.currentReviewIndex() < this.totalReviews - 1) {
      this.currentReviewIndex.update((index) => index + 1);
      this.scrollToCurrentReview();
    }
  }

  navigateToPreviousReview(): void {
    if (this.currentReviewIndex() > 0) {
      this.currentReviewIndex.update((index) => index - 1);
      this.scrollToCurrentReview();
    }
  }

  private scrollToCurrentReview(): void {
    const reviewElements = document.querySelectorAll('.review');
    if (reviewElements[this.currentReviewIndex()]) {
      reviewElements[this.currentReviewIndex()].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }
}
