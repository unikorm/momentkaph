import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      forbidNonWhitelisted: true, // throw error if non-whitelisted properties are present
      whitelist: true,           // strip non-whitelisted properties
      transform: true,      // enables @Transform decorators to run
      stopAtFirstError: true, // collect ALL errors at once (better UX)
      disableErrorMessages: true, // disable detailed error messages for security
      errorHttpStatusCode: 400, // return 400 Bad Request for validation errors
    }
  ));
  const configService = app.get(ConfigService);

  const port = configService.get('PORT', 3000);
  await app.listen(port);
  Logger.log(`🚀 server running on: http://localhost:${port}`);
}
bootstrap();
