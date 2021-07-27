import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import * as favicon from 'serve-favicon';
import { getModelsMap } from './models';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(cookieParser());
  app.use(favicon(join(__dirname, '..', '..', '..', 'client', 'favicon.ico')))


  const config = new DocumentBuilder()
    .setTitle('Authdare API')
    .setDescription('Authdare api service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await getModelsMap()

  await app.listen(process.env['PORT'] || 3000);
}


bootstrap();
