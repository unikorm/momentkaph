import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SendEmailResponseType, SendEmailType } from '../shared/dtos';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  readonly http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  sendEmail(data: SendEmailType): Observable<SendEmailResponseType> {
    return this.http.post<SendEmailResponseType>(
      `${this.apiUrl}/email_sending`,
      data,
      this.httpOptions
    );
  }
}
