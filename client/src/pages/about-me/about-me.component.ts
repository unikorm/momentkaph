import { Component, inject } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { toSignal } from '@angular/core/rxjs-interop';

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
  languageService = inject(LanguageService);
  private route = inject(ActivatedRoute);

  constructor() {
    const routeParams = toSignal(this.route.params);
    const lang = routeParams()?.['lang'];
    if (lang) {
      this.languageService.setLanguage(lang);
    }
  }

  imageState = 'normal';

  onHover() {
    this.imageState = 'hovered';
  }
  onLeave() {
    this.imageState = 'normal';
  }
}
