import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailType } from './dtos';

@Controller('email_sending')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendEmail(@Body() sendEmailDto: SendEmailType) {
    console.log(sendEmailDto, 'sendEmailDto');
    return await this.emailService.sendEmail(sendEmailDto);
  }
}
