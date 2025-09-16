import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { EmailModule } from './email/email.module';
import { CloudStorageModule } from './cloudStorage/cloudStorage.module';
import { FacebookReviewsModule } from './facebookReviews/facebookReviews.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), EmailModule, CloudStorageModule, FacebookReviewsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
