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

@Component({
  standalone: true,
  selector: 'contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly emailService = inject(EmailService);

  constructor() {
    effect(
      () => {
        const data = this.emailData();
        if (data) {
          this.emailSendingStatus.set('sending');
          this.emailService
            .sendEmail(data)
            .pipe(
              tap((value) => {
                console.log(value);
                this.emailSendingStatus.set('success');
                this.newMessageForm.reset();
              }),
              catchError((error) => {
                console.error(error);
                this.emailSendingStatus.set('error');
                return error;
              })
            )
            .subscribe(); // i want this works without subscribe :((
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

  // Computed property for form validity
  isFormValid = computed(() => this.newMessageForm.valid);
  // Computed property for submit button state
  isSubmitDisabled = computed(
    () => !this.isFormValid() || this.emailSendingStatus() === 'sending'
  );

  emailData = signal<SendEmailType | null>(null);
  emailSendingStatus = signal<'idle' | 'sending' | 'success' | 'error'>('idle');

  onSubmit() {
    if (this.isFormValid()) {
      console.log(this.newMessageForm.value);
      this.emailData.set(this.newMessageForm.value as SendEmailType);
    }
  }
}
