import { Module } from '@nestjs/common';
import { EmailModule } from './email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    EmailModule,
    MailerModule.forRoot({
      transport: {
        host: 'blablabla',
        auth: {
          user: 'blaaa',
          pass: 'blaaaaaa',
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
