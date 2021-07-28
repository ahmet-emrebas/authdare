import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MulterModule } from '@nestjs/platform-express';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task/entity/task.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/authdare/main.sqlite',
      entities: [TaskEntity],
      synchronize: true,
      dropSchema: true
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
    }),
    TaskModule
  ],
})
export class AppModule { }
