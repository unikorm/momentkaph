import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FacebookReviewService {
    readonly http = inject(HttpClient);
    
    private pageAccessToken: string;
    private pageId: string;

    async fetchReviews(): Promise<FacebookReview[]> {
        // Makes API call to Facebook Graph API
        const response = await fetch(
            `https://graph.facebook.com/v18.0/${this.pageId}/ratings?access_token=${this.pageAccessToken}`
        );
        return await response.json();
    }
}