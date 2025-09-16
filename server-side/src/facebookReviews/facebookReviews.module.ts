import { Module } from '@nestjs/common';
import { FacebookReviewsController } from './facebookReviews.controller';
import { FacebookReviewsService } from './facebookReviews.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [FacebookReviewsController],
  providers: [FacebookReviewsService],
})
export class FacebookReviewsModule { }