import { Component, signal, computed, effect, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { SendEmailType } from '../../shared/dtos';
import { catchError, tap } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  standalone: true,
  selector: 'contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
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
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(0.8)',
        })
      ),
      transition('normal <=> hovered', animate('300ms ease-in-out')),
    ]),
  ],
})
export class ContactComponent {
  readonly emailService = inject(EmailService);
  imageState = 'normal';

  onImageHover() {
    this.imageState = 'hovered';
  }

  onImageLeave() {
    this.imageState = 'normal';
  }

  constructor() {
    effect(
      () => {
        const data = this.emailData();
        if (data) {
          this.emailService
            .sendEmail(data)
            .pipe(
              tap((value) => {
                console.log(value);
                this.newMessageForm.reset();
              }),
              catchError((error) => {
                console.error(error);
                return error;
              })
            )
            .subscribe();
        }
      },
      { allowSignalWrites: true }
    );
  }

  newMessageForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.pattern(/^\+?[0-9\s-]{10,}$/)]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
  });

  emailData = signal<SendEmailType | null>(null);

  onSubmit() {
    console.log('submit');
    if (this.newMessageForm.valid) {
      console.log(this.newMessageForm.value);
      this.emailData.set(this.newMessageForm.value as SendEmailType);
    }
  }
}
