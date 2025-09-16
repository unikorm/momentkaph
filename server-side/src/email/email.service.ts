import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailResponseServerType, SendEmailServerType } from './dtos';
import { EmailFormTemplate } from './templates/email-form.template';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService, private configService: ConfigService) { }

  sendEmail = async (
    sendEmailDto: SendEmailServerType,
  ): Promise<SendEmailResponseServerType> => {
    try {
      const templateData = {
        ...sendEmailDto,
        timestamp: new Date().toLocaleString('sk-SK', { timeZone: 'Europe/Bratislava' }),
      }
      await this.mailService.sendMail({
        to: this.configService.get('EMAIL_RECIPIENT'),
        subject: `New Request from ${sendEmailDto.name} on momentkaph.sk`,
        html: EmailFormTemplate.generateEmailFormTemplate(templateData),
      });
      return { status: true };
    } catch (error) {
      const errorMessage = error.message || 'Unknown error';
      return { status: false, error: errorMessage };
    }
  };
}
