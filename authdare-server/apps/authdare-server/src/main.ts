import { join } from 'path';
import { genToken } from '@authdare/common';
import { getConnection } from 'typeorm';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { User } from '@authdare/models';
import * as favicon from 'serve-favicon';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(cookieParser());
  app.use(favicon(join(__dirname, '..', '..', '..', 'client', 'favicon.ico')))


  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  const con = getConnection();

  await con.getRepository(User).save({
    email: 'aemrebas.dev@gmail.com',
    password: genToken(),
    org: {
      name: 'authdare',
      database: {
        name: 'authdare',
        type: 'sqlite',
        database: 'database/authdare.sqlite',

      }
    }
  })

  await app.listen(process.env['PORT'] || 3000);
}

bootstrap();
