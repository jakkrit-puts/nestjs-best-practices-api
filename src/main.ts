import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');

  const serverConfig = config.get('server');

  console.log('Starting...#1');
  console.log(serverConfig.port);

  await app.listen(serverConfig.port);
}
bootstrap();
