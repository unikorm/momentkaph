import { Component, signal, effect, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { SendEmailType } from '../../shared/dtos';
import { catchError, finalize, tap } from 'rxjs';
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
  selector: 'contact',
  imports: [ReactiveFormsModule, RouterModule],
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
          transform: 'scale(0.875)',
        })
      ),
      transition('normal <=> hovered', animate('300ms ease-in-out')),
    ]),
  ],
})
export class ContactComponent {
  readonly emailService = inject(EmailService);

  imageState = 'normal';
  formSubmitted = signal<boolean>(false);
  submitStatus: 'idle' | 'sending' | 'success' | 'error' = 'idle';

  onHover() {
    this.imageState = 'hovered';
  }
  onLeave() {
    this.imageState = 'normal';
  }

  constructor() {
    effect(
      () => {
        const data = this.emailData();
        if (data) {
          this.submitStatus = 'sending';
          this.emailService
            .sendEmail(data)
            .pipe(
              tap((value) => {
                // console.log(value);
                this.submitStatus = 'success';
                this.newMessageForm.reset();
                this.formSubmitted.set(false);
              }),
              catchError((error) => {
                // console.error(error);
                this.submitStatus = 'error';
                this.formSubmitted.set(false);
                return error;
              }),
              finalize(() => {
                setTimeout(() => (this.submitStatus = 'idle'), 3000);
              })
            )
            .subscribe(); // HttpClient works only when subscribed
        }
      },
      { allowSignalWrites: true }
    );
  }

  newMessageForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+?[0-9\s-]{10,}$/),
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
  });

  emailData = signal<SendEmailType | null>(null);

  onSubmit() {
    this.formSubmitted.set(true);
    if (this.newMessageForm.valid) {
      this.emailData.set(this.newMessageForm.value as SendEmailType);
    } else {
      // Mark all fields as touched to trigger error messages
      Object.keys(this.newMessageForm.controls).forEach((key) => {
        const control = this.newMessageForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  isFieldInvalid(fieldName: string) {
    const field = this.newMessageForm.get(fieldName);
    return field
      ? field.invalid && this.formSubmitted() && field.errors != null
      : false;
  }
}
