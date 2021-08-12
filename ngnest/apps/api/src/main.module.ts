import { globalConnectionHandler } from './connection';
import { GlobalConnectionModule } from '@authdare/common/module';
import { MainService } from './main.service';
import { AuthModule } from './../../auth/src/auth.module';
import { DatabaseModule } from './../../database/src/database.module';
import { entities } from '@authdare/models';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import loadConfig from './load-config';
import { signupHandler, loginHandler, forgotPasswordHandler } from './auth';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
    imports: [
        DatabaseModule.init(entities),
        GlobalConnectionModule.configure(globalConnectionHandler),
        EventEmitterModule.forRoot({
            global: true,
        }),
        AuthModule.init({
            loginHandler,
            signupHandler,
            forgotPasswordHandler,
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [loadConfig],
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, 'public'),
            renderPath: '/',
            exclude: ['api', 'api/**/*'],
        }),
    ],
    providers: [MainService],
})
export class MainModule {}
