import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import * as secrets from './dtos/secrets';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: secrets.EMAIL_HOST, // host of the email provider
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: secrets.EMAIL_USERNAME, // my email adress
          pass: secrets.EMAIL_PASSWORD, // my app-specific password
        },
      },
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
