import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  standalone: true,
  selector: 'gallery',
  imports: [RouterModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
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
          transform: 'scale(0.84)',
        })
      ),
      transition('normal <=> hovered', animate('300ms ease-in-out')),
    ]),
  ],
})
export class GalleryComponent {

  imageStates: { [key: string]: string } = {
    weddings: 'normal',
    'love-story': 'normal',
    pregnancy: 'normal',
    family: 'normal',
    studio: 'normal',
    baptism: 'normal',
    portrait: 'normal',
  };

  onHover(section: string) {
    this.imageStates[section] = 'hovered';
  }
  onLeave(section: string) {
    this.imageStates[section] = 'normal';
  }

  toggleState(section: string) {
    this.imageStates[section] =
      this.imageStates[section] === 'normal' ? 'hovered' : 'normal';
  }
}
