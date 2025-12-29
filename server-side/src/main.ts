import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get('PORT', 3000);
  const corsOrigin = configService.get('CORS_ORIGIN'); // for local purpose only, browser enforce CORS -> on prod it handle nginx

  app.enableCors({
    origin: corsOrigin,
  });
  await app.listen(port);
  Logger.log(`🚀 server running on: http://localhost:${port}`);
}
bootstrap();
