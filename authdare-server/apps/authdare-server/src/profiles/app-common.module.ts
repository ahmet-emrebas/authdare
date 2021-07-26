import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from '@authdare/auth';
import { Org, User } from '@authdare/models';
import { UserService } from '../user';

export const CommonModules = [
    TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'database/authdare.sqlite',
        entities: [User, Org],
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

    AuthModule.register({
        userResouceService: UserService,
        imports: [
            TypeOrmModule.forFeature([User]),
        ]
    })
]
