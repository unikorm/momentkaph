import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SendEmailResponseType, SendEmailType } from '../shared/dtos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  readonly http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000'; // make it build in

  sendEmail(data: SendEmailType): Observable<SendEmailResponseType> {
    // console.log(data, 'data');
    return this.http.post<SendEmailResponseType>(
      `${this.apiUrl}/email_sending`,
      data
    );
  }
}
