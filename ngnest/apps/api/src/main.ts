import { NestFactory } from '@nestjs/core';
import { Logger, INestApplication } from '@nestjs/common';
import { yellow } from 'chalk'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiModule } from './api.module';
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors';
import { ApiConfig } from '@authdare/config';

function configureSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle(ApiConfig.APP_NAME)
    .setDescription('Backend application of Authdare Products')
    .setVersion('1.0')
    .addTag('Api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(ApiConfig.SWAGGER_PATH, app, document);
}


async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  app.setGlobalPrefix(ApiConfig.API_BASEPATH);

  app.use(cors());
  app.use(cookieParser())

  configureSwagger(app);
  await app.listen(ApiConfig.PORT, () => {
    Logger.log(`Nest application started at port ${yellow(ApiConfig.PORT)}`, 'NestApplication')
  });
}

bootstrap().then().catch();


