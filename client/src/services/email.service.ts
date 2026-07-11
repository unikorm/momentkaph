import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SendEmailType } from '../shared/dtos';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  readonly http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  sendEmail(data: SendEmailType): Observable<HttpResponse<unknown>> {
    return this.http.post<unknown>(
      `${this.apiUrl}/email_sending`,
      data,
      { observe: 'response' }
    );
  }
}
