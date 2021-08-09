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
import * as csurf from 'csurf';
import { v4 as uuid } from 'uuid';

async function bootstrap() {
    const server = express();
    server.use(helmet());
    server.use((req, res, next) => {
        req.headers['access-control-allow-credentials'] = 'http://localhost:4200';
        req.headers['access-control-allow-headers'] = '*';
        next();
    });
    server.use(
        session({
            name: 'session',
            secret: 'my-secret',
            cookie: {
                sameSite: false,
            },
            resave: false,

            saveUninitialized: true,
        }),
    );
    server.use(cookieParser());
    server.use(cors({}));
    // server.use(
    //     csurf({
    //         cookie: true,
    //         sessionKey: uuid(),
    //     }),
    // );
    const adapter = new ExpressAdapter(server);

    // Resource Module
    const resourceApi = await NestFactory.create(ResourcesModule, adapter);
    configureSwagger({
        app: resourceApi,
        description: 'Api resource documentation',
        title: 'Api Resources',
        path: 'api',
    });

    // Auth Module
    const authApp = await NestFactory.create(AuthModule, adapter);
    configureSwagger({
        app: authApp,
        description: 'Authentication modules documentation',
        title: 'Authentication Routes',
        path: 'auth',
    });

    resourceApi.init();
    authApp.init();
    await adapter.listen(process.env['PORT'] || 3000);
}
bootstrap();
