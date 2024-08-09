import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { SendEmailType } from '../type/send-email.type';

export class SendEmailDto implements SendEmailType {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  message: string;
}
