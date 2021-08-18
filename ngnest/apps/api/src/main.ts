import { MainModule } from './main.module';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { crossOriginCookieMiddleware } from '@authdare/common/middleware';
import { configureApplication, uuid } from '@authdare/common/util';
import { uniq, flatten } from 'lodash';

const favicon = require('express-favicon');

async function bootstrap() {
    const server = express();

    // Fuck yeah!!!!!
    server.use(favicon('public/favicon.ico'));
    server.use(favicon('./public/favicon.ico'));
    server.use(favicon('./public/favicon'));
    server.use(favicon('./public/favicon.ico'));
    server.use(favicon('./favicon.ico'));
    server.use(favicon('favicon.ico'));
    server.use(favicon('favicon'));

    const middlewares = [
        helmet(),
        crossOriginCookieMiddleware(['http://localhost:4200']),
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
        middlewares,
    });

    mainApp.init();
    // monitorApp.init();

    setTimeout(() => {
        permissions(server);
    }, 3000);
    await expressAdapter.listen(process.env.PORT || 3000);
}

bootstrap();

function permissions(server: any) {
    const __routes = server._router.stack
        .filter((e: express.Router) => e.route)
        .map((e: any) => e.route.path.split('/')[1]) as string[];

    const routes = uniq(__routes).filter((e) => e.length > 0);
    const permissions = flatten(
        ['find', 'query', 'save', 'delete', 'udpate'].map((e) => routes.map((r) => `${e} : ${r}`)),
    );

    console.table(permissions);
}

// UUIDs
console.table(
    [uuid(), uuid(), uuid(), uuid(), uuid(), uuid(), uuid(), uuid()].map((e) => ({ uuid: e })),
);
