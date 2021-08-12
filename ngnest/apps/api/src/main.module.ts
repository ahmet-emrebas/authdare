import { DatabaseModule } from './../../database/src/database.module';
import { entities } from '@authdare/models';

import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import loadConfig from './load-config';

@Module({
    imports: [
        DatabaseModule.init(entities),
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
