import { MainModule } from './main.module';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { crossOriginCookieMiddleware } from '@authdare/common/middleware';
import { ConfigModule } from '@authdare/config';
import { configureApplication } from '@authdare/common/util';
import { I18nModule } from '@authdare/i18n';

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
    const mainApp = await configureApplication({
        title: 'Main Module',
        module: MainModule,
        description: 'Resource and Authentication Module',
        docPath: 'doc/api',
        adapter: expressAdapter,
        middlewares: middlewares,
    });

    // Configuration App
    const configApp = await configureApplication({
        title: 'Configuration Module',
        module: ConfigModule,
        description: 'Configuretio services',
        docPath: 'doc/config',
        adapter: expressAdapter,
        middlewares: [],
    });

    const i18nAPp = await configureApplication({
        title: 'I18N Module',
        module: I18nModule,
        description: 'Internalization Service',
        adapter: expressAdapter,
        middlewares: [],
        docPath: 'doc/i18n',
    });

    mainApp.init();
    configApp.init();
    i18nAPp.init();
    await expressAdapter.listen(process.env['PORT'] || 3000);
}

bootstrap();
