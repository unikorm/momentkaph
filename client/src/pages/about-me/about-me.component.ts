import { Component, signal } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { RouterModule } from '@angular/router';

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
          transform: 'scale(0.87)',
        })
      ),
      transition('normal <=> hovered', animate('300ms ease-in-out')),
    ]),
  ],
})
export class AboutMeComponent {

  readonly imageState = signal<'normal' | 'hovered'>('normal');

  onHover() {
    this.imageState.set('hovered');
  }
  onLeave() {
    this.imageState.set('normal');
  }
}
