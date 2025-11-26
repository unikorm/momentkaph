import { Injectable, Logger } from '@nestjs/common';
import { SendEmailResponseServerType, SendEmailServerType } from './dtos';
import { EmailFormTemplate } from './templates/email-form.template';
import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private resend: Resend;
  private readonly logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {
    const apikey = this.configService.get('RESEND_API_KEY');
    this.resend = new Resend(apikey);
  }

  sendEmail = async (
    sendEmailDto: SendEmailServerType,
  ): Promise<SendEmailResponseServerType> => {
    try {
      const templateData = {
        ...sendEmailDto,
        timestamp: new Date().toLocaleString('sk-SK', { timeZone: 'Europe/Bratislava' }),
      };

      const msg = {
        from: this.configService.get('EMAIL_SENDER'),
        to: this.configService.get('EMAIL_RECIPIENT'),
        subject: `New message from ${sendEmailDto.name} on momentkaph.sk`,
        html: EmailFormTemplate.generateEmailFormTemplate(templateData),
      };

      const response = await this.resend.emails.send(msg);

      // Log error if resend API returns an error
      if (response.error) {
        this.logger.error(
          `Resend API returned an error: ${response.error.message}`,
          response.error
        );
        return { status: false };
      }

      // If email is sent successfully
      if (response.data?.id) {
        return { status: true };
      }
    } catch (error) {
      this.logger.error(
        `Failed to send email due to exception: ${error.message}`,
        error.stack
      );
      return { status: false };
    }
  };
}