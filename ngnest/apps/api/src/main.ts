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
        csurf({ cookie: true }),
    ];

    const expressAdapter = new ExpressAdapter(server);

    const mainApp = await NestFactory.create(MainModule, expressAdapter);
    mainApp.use(middlewares);
    await mainApp.init();

    await expressAdapter.listen(process.env['PORT'] || 3000);
}

bootstrap();
