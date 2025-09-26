import { Injectable } from '@nestjs/common';
import { SendEmailResponseServerType, SendEmailServerType } from './dtos';
import { EmailFormTemplate } from './templates/email-form.template';
import * as sgMail from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {
    const apikey = this.configService.get('SENDGRID_API_KEY');
    sgMail.setApiKey(apikey);
  }

  sendEmail = async (
    sendEmailDto: SendEmailServerType,
  ): Promise<SendEmailResponseServerType> => {
    try {
      const templateData = {
        ...sendEmailDto,
        timestamp: new Date().toLocaleString('sk-SK', { timeZone: 'Europe/Bratislava' }),
      }
      const msg = {
        to: this.configService.get('EMAIL_RECIPIENT'),
        from: this.configService.get('SENDGRID_FROM_EMAIL'),
        subject: `New message from ${sendEmailDto.name} on momenntkaph.sk`,
        html: EmailFormTemplate.generateEmailFormTemplate(templateData),
      };

      await sgMail.send(msg);
      return { status: true };
    } catch (error) {
      const errorMessage = error.message || 'Unknown error';
      return { status: false, error: errorMessage };
    }
  };
}
