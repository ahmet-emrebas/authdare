import { NestFactory, } from '@nestjs/core';
import { Logger, HttpStatus } from '@nestjs/common';
import { yellow } from 'chalk'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiModule } from './api.module';
import { Config, startConfigServer } from './config';
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors';


async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  app.setGlobalPrefix(Config.API_BASEPATH);
  app.use(cors());
  app.use(cookieParser())
  const config = new DocumentBuilder()
    .setTitle('Authdare Api')
    .setDescription('Api')
    .setVersion('1.0')
    .addTag('Authdare')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(Config.SWAGGER_PATH, app, document);

  const PORT = process.env['PORT'] || Config.PORT
  await app.listen(PORT, () => {
    Logger.log(`Nest application started at port ${yellow(PORT)}`, 'NestApplication')
  });
}

bootstrap().then().catch();


