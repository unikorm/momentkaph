import { Module } from '@nestjs/common';
import { CloudStorageController } from './cloudStorage.controller';
import { CloudStorageService } from './cloudStorage.service';

@Module({
  controllers: [CloudStorageController],
  providers: [CloudStorageService],
})
export class CloudStorageModule {}
