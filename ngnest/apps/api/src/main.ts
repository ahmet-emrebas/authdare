import { ConfigService } from '@nestjs/config';
import { MainModule } from './main.module';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { DatabaseModule } from './../../database/src/database.module';
import { NestFactory } from '@nestjs/core';
const a = 1234;

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
            cookie: { sameSite: false },
            resave: false,
            saveUninitialized: true,
        }),
    );
    server.use(cookieParser());
    server.use(cors({}));
    // server.use(csurf({ cookie: true, sessionKey: uuid() }));

    const expressAdapter = new ExpressAdapter(server);

    // Main Wrapper App
    const mainApp = await NestFactory.create(MainModule, expressAdapter);
    mainApp.init();
    const configService = mainApp.get(ConfigService);

    console.log(configService.get('database'));

    // Configurations
    const databaseModuleConfig = configService.get('database')!;
    const authModuleConfig = configService.get('database')!;

    //Configuring Modules
    const databaseModule = DatabaseModule.configure(databaseModuleConfig);

    // Creating apps
    const databaseApp = await NestFactory.create(databaseModule, expressAdapter);
    databaseApp.init();

    await expressAdapter.listen(process.env['PORT'] || 3000);
}

bootstrap();
