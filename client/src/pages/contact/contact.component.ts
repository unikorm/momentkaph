import { Component, signal, computed, effect } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  newMessageForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.pattern(/^\+?[0-9\s-]{10,}$/)]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
  });

  formSubmitted = signal<boolean>(false);

  onSubmit() {
    this.formSubmitted.set(true);
    if (this.newMessageForm.valid) {
      console.log(this.newMessageForm.value);
      this.newMessageForm.reset();
      this.formSubmitted.set(false);
    }
  }
}
