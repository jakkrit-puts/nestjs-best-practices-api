import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { HttpExceptionFilter } from './common/filters/http-exeption.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
// import { ErrorsInterceptor } from './common/interceptors/error.interceptor';

async function bootstrap() {
  const opts: NestApplicationOptions = {};
  const app = await NestFactory.create(AppModule, opts);

  // cors
  app.enableCors();

  // interceptors
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
    // new ErrorsInterceptor(),
  );

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api/v1');

  const serverConfig = config.get('server');

  console.log('Starting Server...');
  console.log(serverConfig.port);

  await app.listen(serverConfig.port);
}
bootstrap();
