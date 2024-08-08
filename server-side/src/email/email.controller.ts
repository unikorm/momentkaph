import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email_sending')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendEmail(@Body() body: { message: string }) {
    const { message } = body;
    return await this.emailService.sendEmail(message);
  }
}
