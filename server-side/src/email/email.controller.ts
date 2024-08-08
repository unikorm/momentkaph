import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { send } from 'process';
import { SendEmailDto } from './dtos';

@Controller('email_sending')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return await this.emailService.sendEmail(sendEmailDto);
  }
}
