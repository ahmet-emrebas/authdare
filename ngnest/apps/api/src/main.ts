import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import * as  express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AuthModule } from '@authdare/auth';
import { configureSwagger } from './swagger';

async function bootstrap() {
  const server = express()
  const adapter = new ExpressAdapter(server);

  const apiApp = await NestFactory.create(ApiModule, adapter);
  const authApp = await NestFactory.create(AuthModule, adapter);

  configureSwagger({ app: apiApp, description: 'Api doc', title: 'Api', path: 'api' });
  configureSwagger({ app: authApp, description: 'Auth app doc', title: 'Auth', path: 'auth' });

  apiApp.init();
  authApp.init();

  await adapter.listen(process.env['PORT'] || 3000);
}
bootstrap();
