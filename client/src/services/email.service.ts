import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpHeader, SendEmailResponseType, SendEmailType } from '../shared/dtos';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  readonly http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  sendEmail(data: SendEmailType): Observable<SendEmailResponseType> {
    return this.http.post<SendEmailResponseType>(
      `${this.apiUrl}/email_sending`,
      data,
      httpHeader // ??
    );
  }
}
