import { MainModule } from './main.module';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { NestFactory } from '@nestjs/core';
import { crossOriginCookieMiddleware } from '@authdare/common/middleware';
import * as csurf from 'csurf';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigModule } from '@authdare/config';
import { configureApplications } from '@authdare/common/util';

async function bootstrap() {
    const server = express();
    const middlewares = [
        helmet(),
        crossOriginCookieMiddleware(['http://localhost:4200']),
        session({
            name: 'session',
            secret: 'my-secret',
            cookie: { sameSite: false },
            resave: false,
            saveUninitialized: true,
        }),
        cookieParser(),
        cors({}),
        // csurf({}),
    ];

    const expressAdapter = new ExpressAdapter(server);

    // Main App
    const mainApp = await configureApplications({
        title: 'Main Module',
        module: MainModule,
        description: 'Resource and Authentication Module',
        docPath: 'api',
        adapter: expressAdapter,
        middlewares: middlewares,
    });

    // Configuration App
    const configApp = await configureApplications({
        title: 'Configuration Module',
        module: ConfigModule,
        description: 'Configuretio services',
        docPath: 'config',
        adapter: expressAdapter,
        middlewares: [],
    });

    mainApp.init();
    configApp.init();

    await expressAdapter.listen(process.env['PORT'] || 3000);
}

bootstrap();
