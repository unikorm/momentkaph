import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT', 3000);
  app.enableCors({
    // origin: 'http://momentkaph.sk',
    // credentials: true,
    // methods: ['POST']
  });
  await app.listen(port);
  Logger.log(`🚀 server running on: http://localhost:3000`);
}
bootstrap();
