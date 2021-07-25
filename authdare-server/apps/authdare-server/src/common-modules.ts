import { Profiles } from './profile/app-profiles';
import { getArg } from '@authdare/common';
import { LoginModule } from '@authdare/core';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

const AdminModules = [
    JwtModule.register({
        secret: 'secret',
    }),
    TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'database/authdare.sqlite',
        synchronize: true,
        dropSchema: true,
    }),
    ScheduleModule.forRoot(),
    MulterModule.register({
        dest: './upload',
    }),
    ThrottlerModule.forRoot({
        ttl: 60,
        limit: 10,
    }),
    ServeStaticModule.forRoot({
        rootPath: join(__dirname, 'client'),
        renderPath: '/',
        exclude: ['api', 'api/**'],
    }),
    LoginModule.register({})
]

const DevelopmentModules = [
    ...AdminModules
]

export const ModuelsByProfile: Profiles = {
    development: DevelopmentModules,
    admin: AdminModules,
    public: [],
    subscriber: []
}

export const CommonModules = () => ModuelsByProfile[getArg('profile')]