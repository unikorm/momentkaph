
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class SendEmailDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  // Sanitize: strip leading/trailing whitespace
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(254) // RFC 5321 max email length
  @Transform(({ value }) => value?.trim().toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\+?[0-9\s-]{10,}$/)
  @Transform(({ value }) => value?.trim())
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  @MaxLength(700)
  @Transform(({ value }) => value?.trim())
  message: string;
}

export type SendEmailResponseServerType = {
  status: boolean;
};
