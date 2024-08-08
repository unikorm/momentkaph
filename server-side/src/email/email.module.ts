import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cS: ConfigService) => ({
        transport: {
          host: cS.get<string>('EMAIL_HOST'), // host of the email provider
          port: 587,
          secure: false, // Use `true` for port 465, `false` for all other ports
          auth: {
            user: cS.get<string>('EMAIL_USERNAME'), // my email adress
            pass: cS.get<string>('EMAIL_PASSWORD'), // my app-specific password
          },
        },
      }),
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
