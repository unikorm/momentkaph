import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailResponseType, SendEmailType } from './dtos';

@Controller('email_sending')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendEmail(
    @Body() sendEmailType: SendEmailType,
  ): Promise<SendEmailResponseType> {
    return await this.emailService.sendEmail(sendEmailType);
  }
}
