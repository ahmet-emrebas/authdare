import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { join } from 'path';
import { ConfigEnum } from '@base';
import { Logger } from '@nestjs/common';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

config({ debug: true, path: join(process.cwd(), 'config', '.conf') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  // app.use(helmet());
  app.use(cookieParser());

  app.setGlobalPrefix(process.env[ConfigEnum.GLOBAL_PREFIX]);

  const config = new DocumentBuilder()
    .setTitle('Swagger Title')
    .setDescription('Description of the api')
    .setVersion('1.0')
    .addTag('Tags')
    .build();

  try {
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  } catch (err) {
    console.error(err);
  }
  await app.listen(3000, async () => {
    Logger.log('Nest application started at port ' + 3000, 'NestApplication');

  });
}
bootstrap().then().catch();

