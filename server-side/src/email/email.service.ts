import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  sendEmail = async (message: string) => {
    try {
      await this.mailService.sendMail({
        to: 'adaled00@gmail.com',
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
