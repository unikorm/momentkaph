import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule { }