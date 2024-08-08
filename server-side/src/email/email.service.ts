import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailDto } from './dtos';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailService: MailerService,
    private readonly cS: ConfigService,
  ) {}

  sendEmail = async (sendEmailDto: SendEmailDto) => {
    const { name, email, phone, message } = sendEmailDto;
    try {
      await this.mailService.sendMail({
        to: this.cS.get<string>('EMAIL_USERNAME'),
        subject: 'Test Subject',
        text: message,
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };
}
