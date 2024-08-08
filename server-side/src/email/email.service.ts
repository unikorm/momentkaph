import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { error } from 'console';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  sendEmail = async (message: any) => {
    const { to, subject, text } = message;
    await this.mailService
      .sendMail({
        to: 'test reciever',
        subject: 'Test Subject',
        text: 'test message',
      })
      .catch((error) => console.log(error))
      .finally(() => console.log('it is done'));
  };
}
