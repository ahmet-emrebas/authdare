import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MulterModule } from '@nestjs/platform-express';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getModelMap } from '@authdare/base';
import { values } from 'lodash';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          type: 'sqlite',
          database: 'database/authdare/main.sqlite',
          entities: values((await getModelMap())).map(e => e.entity),
          synchronize: true,
          dropSchema: true
        }
      }
    }),
    ScheduleModule.forRoot(),
    MulterModule.register({ dest: './upload', }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 10, }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', '..', '..', 'client'), renderPath: '/', exclude: ['api', 'api/**'], }),
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env['SECRET'] || 'secret'
        };
      },
    })
  ],
})
export class AppModule { }
