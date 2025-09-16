import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetReviewsResponseType } from '../shared/dtos';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FacebookReviewService {
  readonly http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  fetchReviews(): Observable<GetReviewsResponseType> {
    return this.http.get<GetReviewsResponseType>(
      `${this.apiUrl}/facebook_reviews`
    );
  }
}
