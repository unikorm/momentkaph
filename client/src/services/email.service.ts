import { inject, Injectable, Signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SendEmailResponseType, SendEmailType } from '../shared/dtos';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  readonly http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  sendEmail(data: SendEmailType): Observable<SendEmailResponseType> {
    console.log(data, 'data');
    return this.http.post<SendEmailResponseType>(
      `${this.apiUrl}/email_sending`,
      data
    );
  }
}
