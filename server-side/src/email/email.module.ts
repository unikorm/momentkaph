import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: 'maddison53@ethereal.email',
          pass: 'jn7jnAPss4f63QBp6D',
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class EmailModule {}
