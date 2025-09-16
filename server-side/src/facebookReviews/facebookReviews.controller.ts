import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { FacebookReviewsService } from './facebookReviews.service';
import { CacheHeaderInterceptor } from 'src/interceptors/cache.interceptor';
import { GetReviewsResponseType } from './dtos';

@Controller('facebook_reviews')
@UseInterceptors(CacheHeaderInterceptor)
export class FacebookReviewsController {
  constructor(private readonly facebookReviewsService: FacebookReviewsService) { }

  @Get()
  async fetchReviews(
  ): Promise<GetReviewsResponseType> {
    return await this.facebookReviewsService.fetchReviews();
  }
}
