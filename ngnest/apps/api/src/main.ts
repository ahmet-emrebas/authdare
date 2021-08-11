import { snakeCase } from 'lodash';
import { modules } from './modules';
import { ConfigService } from '@nestjs/config';
import { MainModule } from './main.module';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import crossOriginCookieMiddleware from '@authdare/common/middleware/cross-origin-cookie..middleware';
import * as csurf from 'csurf';
import { v4 } from 'uuid';

async function bootstrap() {
    const logger = new Logger('bootstrap');
    const server = express();

    const middlewares = [
        helmet(),
        crossOriginCookieMiddleware(['http://localhost:3000']),
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

    // server.use();

    const expressAdapter = new ExpressAdapter(server);

    // Main Wrapper App
    const mainApp = await NestFactory.create(MainModule, expressAdapter);
    mainApp.use(middlewares);
    const configService = mainApp.get(ConfigService);

    const configuredModules = [mainApp];
    for (const m of modules as any) {
        const conf = configService.get(m.name)!;
        console.log('Prefix of ', m.name, conf.prefix);
        logger.log(`creating the ${m.name} with configuration`);

        let module = null;
        if (m.configure) {
            module = await m.configure(conf);
        } else {
            module = m;
        }
        const createdApp = await NestFactory.create(module, expressAdapter);

        createdApp.use(middlewares);

        createdApp.setGlobalPrefix(conf.prefix);

        if (conf?.swagger) {
            console.table(conf.swagger);
            SwaggerModule.setup(
                conf.swagger.path,
                createdApp,
                SwaggerModule.createDocument(
                    createdApp,
                    new DocumentBuilder()
                        .setTitle(conf.swagger.title)
                        .setDescription(conf.swagger.description)
                        .build(),
                ),
            );
        }
        configuredModules.push(createdApp);
    }

    await Promise.all(configuredModules.map((__app) => __app.init()));

    await expressAdapter.listen(process.env['PORT'] || 3000);
}

bootstrap();
