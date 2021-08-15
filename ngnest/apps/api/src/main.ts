import { MainModule } from './main.module';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { crossOriginCookieMiddleware } from '@authdare/common/middleware';
import { configureApplication, uuid } from '@authdare/common/util';

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

    mainApp.init();

    await expressAdapter.listen(process.env['PORT'] || 3000);
}

bootstrap();

// UUIDs
console.table(
    [uuid(), uuid(), uuid(), uuid(), uuid(), uuid(), uuid(), uuid()].map((e) => ({ uuid: e })),
);
