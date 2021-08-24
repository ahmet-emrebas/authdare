import { MainModule } from './main.module';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { configureApplication } from '@authdare/common/util';
import { join } from 'path';
import * as favicon from 'serve-favicon';

async function bootstrap() {
    const server = express();

    server.use(favicon(join(__dirname, 'public', 'favicon.ico')));

    const middlewares = [
        helmet(),
        // crossOriginCookieMiddleware(['http://localhost:4200']),
        cookieParser(),
        cors({}),
    ];

    const expressAdapter = new ExpressAdapter(server);

    // Main App
    const mainApp = await configureApplication({
        title: 'Main Module',
        module: MainModule,
        description: 'Resource and Authentication Module',
        docPath: '/api',
        adapter: expressAdapter,
        middlewares,
    });

    mainApp.init();

    await expressAdapter.listen(process.env.PORT || 3000);
}

bootstrap();
