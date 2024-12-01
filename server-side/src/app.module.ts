import { Module } from '@nestjs/common';
import { EmailModule } from './email/email.module';
import { CloudStorageModule } from './cloudStorage/cloudStorage.module';

@Module({
  imports: [EmailModule, CloudStorageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
