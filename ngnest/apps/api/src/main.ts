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

    const mainApp = await NestFactory.create(MainModule, expressAdapter);

    mainApp.use(middlewares);

    mainApp.setGlobalPrefix(':orgname');

    const config = new DocumentBuilder()
        .setTitle('Authdare API')
        .setDescription('All modules and services')
        .build();

    const document = SwaggerModule.createDocument(mainApp, config);
    SwaggerModule.setup('api', mainApp, document);

    await mainApp.init();

    await expressAdapter.listen(process.env['PORT'] || 3000);
}

bootstrap();
