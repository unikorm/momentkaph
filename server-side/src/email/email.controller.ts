import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailResponseServerType, SendEmailDto } from './dtos';

@Controller('email_sending')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @Post()
  async sendEmail(
    @Body() sendEmailType: SendEmailDto,
  ): Promise<SendEmailResponseServerType> {
    return await this.emailService.sendEmail(sendEmailType);
  }
}
