import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailResponseType, SendEmailType } from './dtos';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  sendEmail = async (
    sendEmailDto: SendEmailType,
  ): Promise<SendEmailResponseType> => {
    const { name, email, phone, message } = sendEmailDto;
    try {
      await this.mailService.sendMail({
        to: 'adaled00@gmail.com',
        subject: 'Test Subject',
        text: message + name + email + phone,
      });
      return { status: true };
    } catch (error) {
      const errorMessage = error.message || 'Unknown error';
      return { status: false, error: errorMessage };
    }
  };
}
