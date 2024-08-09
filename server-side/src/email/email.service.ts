import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailDto } from './dtos';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  sendEmail = async (sendEmailDto: SendEmailDto) => {
    const { name, email, phone, message } = sendEmailDto;
    try {
      await this.mailService.sendMail({
        to: 'adaled00@gmail.com',
        subject: 'Test Subject',
        text: message + name + email + phone,
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };
}
