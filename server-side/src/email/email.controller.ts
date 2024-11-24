import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailResponseServerType, SendEmailServerType } from './dtos';

@Controller('email_sending')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendEmail(
    @Body() sendEmailType: SendEmailServerType,
  ): Promise<SendEmailResponseServerType> {
    return await this.emailService.sendEmail(sendEmailType);
  }
}
