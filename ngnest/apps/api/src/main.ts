import { join } from 'path';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as favicon from 'serve-favicon';
import * as cors from 'cors'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cors());
  app.use(cookieParser());
  app.use(favicon(join(__dirname, '..', '..', 'public', 'favicon.ico')));
  const config = new DocumentBuilder()
    .setTitle('Authdare Api')
    .setDescription('Atomic role and permission assignment ... ')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('', app, document);

  await app.listen(process.env['PORT'] || 3000);
}

bootstrap()
  .then(() => {
    Logger.log('Initializing....', 'Bootstrap');
  })
  .catch((err) => {
    Logger.error(err);
  });
