import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { EmailModule } from './email/email.module';
import { CloudStorageModule } from './cloudStorage/cloudStorage.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), EmailModule, CloudStorageModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
