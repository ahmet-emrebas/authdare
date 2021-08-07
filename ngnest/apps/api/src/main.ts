import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { configureSwagger } from './swagger';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { ResourcesModule } from '@authdare/resources';
import { AuthModule } from '@authdare/auth';

async function bootstrap() {
    const server = express();
    server.use(helmet());
    // server.use(csurf());

    server.use(
        session({
            name: 'session',
            secret: 'my-secret',
            cookie: {
                sameSite: true,
            },
            resave: false,
            saveUninitialized: true,
        }),
    );

    server.use(cookieParser());
    server.use(cors());

    const adapter = new ExpressAdapter(server);

    // // AppModule
    // const mainApp = await NestFactory.create(ApiModule, adapter);
    // configureSwagger({ app: mainApp, description: 'Api doc', title: 'Api', path: '' });
    // mainApp.init();

    // Resource Module
    const resourceApi = await NestFactory.create(ResourcesModule, adapter);
    configureSwagger({ app: resourceApi, description: 'Api doc', title: 'Api', path: 'api' });
    resourceApi.init();

    // Auth Module
    const authApp = await NestFactory.create(AuthModule, adapter);
    configureSwagger({ app: authApp, description: 'Auth app doc', title: 'Auth', path: 'auth' });
    authApp.init();

    // // Database Module
    // const databaseApp = await NestFactory.create(DatabaseModule.register(), adapter);
    // configureSwagger({ app: databaseApp, description: 'Database app doc', title: 'Database', path: 'db' });

    // databaseApp.init();

    await adapter.listen(process.env['PORT'] || 3000);
}
bootstrap();
