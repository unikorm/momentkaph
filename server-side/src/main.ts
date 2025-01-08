import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get('PORT', 3000);
  const corsOrigin = configService.get('CORS_ORIGIN');
  const corsMethods = configService.get('CORS_METHODS').split(',');
  const corsHeaders = configService.get('CORS_HEADERS').split(',');
  const corsMaxAge = parseInt(configService.get('CORS_MAX_AGE'), 3600);

  app.enableCors({
    origin: corsOrigin,
    methods: corsMethods,
    allowedHeaders: corsHeaders,
    maxAge: corsMaxAge
  });
  await app.listen(port);
  Logger.log(`🚀 server running on: http://localhost:${port}`);
}
bootstrap();
