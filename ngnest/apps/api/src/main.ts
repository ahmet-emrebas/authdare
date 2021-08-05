import { NestFactory } from '@nestjs/core';
import * as  express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AuthModule } from '@authdare/auth/auth.module';
import { configureSwagger } from './swagger';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { ResourcesModule } from '@authdare/resources/resources.module';


async function bootstrap() {

  const server = express()

  server.use(session({
    name: 'session',
    secret: 'my-secret',
    cookie: {
      sameSite: true
    },
    resave: false,
    saveUninitialized: true,
  }));

  server.use(cookieParser());
  server.use(helmet());
  server.use(cors());

  const adapter = new ExpressAdapter(server);

  // Main API
  const resourceApi = await NestFactory.create(ResourcesModule, adapter);
  configureSwagger({ app: resourceApi, description: 'Api doc', title: 'Api', path: 'api' });

  // Auth APP 
  const authApp = await NestFactory.create(AuthModule, adapter);
  configureSwagger({ app: authApp, description: 'Auth app doc', title: 'Auth', path: 'auth' });

  resourceApi.init();
  authApp.init();

  await adapter.listen(process.env['PORT'] || 3000);
}
bootstrap();



