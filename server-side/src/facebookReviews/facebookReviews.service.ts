import { Injectable } from '@nestjs/common';
import { GetReviewsResponseType } from './dtos';

@Injectable()
export class FacebookReviewsService {
    async fetchReviews(): Promise<GetReviewsResponseType> {
        return { reviews: [] };
    }
}