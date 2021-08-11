import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import config from './config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),

        ServeStaticModule.forRoot({
            rootPath: join(__dirname, 'public'),
            renderPath: '/',
        }),
    ],
})
export class MainModule {}
