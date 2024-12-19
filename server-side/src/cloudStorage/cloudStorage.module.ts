import { Module } from '@nestjs/common';
import { CloudStorageController } from './cloudStorage.controller';
import { CloudStorageService } from './cloudStorage.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [CloudStorageController],
  providers: [CloudStorageService],
})
export class CloudStorageModule { }
