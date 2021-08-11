import { MainController } from './main.controller';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import loadConfig from './load-config';

@Module({
    controllers: [MainController],
    imports: [
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
})
export class MainModule {}
