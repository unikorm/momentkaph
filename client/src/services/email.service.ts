import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SendEmailType } from '../shared/dtos';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  readonly http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  sendEmail(data: SendEmailType) {
    // i want something return here
    console.log(data, 'data');
    this.http.post(`${this.apiUrl}/email_sending`, data)
  }
}
