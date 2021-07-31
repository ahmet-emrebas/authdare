import { AuthService } from './auth.service';

import { ResourceController } from './resource.controller';
import { AuthControler } from './auth.controller';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MulterModule } from '@nestjs/platform-express';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { values } from 'lodash';
import { entities } from './utils';

@Module({
  controllers: [ResourceController, AuthControler],
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/authdare/main.sqlite',
      synchronize: true,
      dropSchema: true,
      entities: values(entities())
    }),
    TypeOrmModule.forFeature(values(entities())),
    JwtModule.register({ secret: 'secret', }),
    ScheduleModule.forRoot(),
    MulterModule.register({ dest: './upload' }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'client'),
      renderPath: '/',
      exclude: ['api', 'api/**'],
    }),

  ],
  providers: [AuthService],
})
export class AppModule {

}
