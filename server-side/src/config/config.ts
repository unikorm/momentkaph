import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfig {
  constructor(private configService: ConfigService) {}

  requireEnv(name: string): string {
    const value = this.configService.get<string>(name);
    if (!value) {
      throw new Error(`${name} is not defined`);
    }
    return value;
  }
}

export const config = {
  bucket: {
    name: process.env.BUCKET_NAME,
    region: process.env.BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.BUCKET_ACCESS_KEY,
      secretAccessKey: process.env.BUCKET_SECRET_KEY,
    },
    endpoint: process.env.BUCKET_ENDPOINT,
  },
  email: {
    host: process.env.EMAIL_HOST,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
  },
  port: process.env.BE_PORT,
};