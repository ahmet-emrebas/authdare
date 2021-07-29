import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MulterModule } from '@nestjs/platform-express';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity, TaskModule } from './resources/task';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          type: 'postgres',
          host: 'localhost',
          database: 'authdare',
          username: 'postgres',
          password: 'password',
          entities: [TaskEntity],
          synchronize: true,
          dropSchema: true,
        };
      },
    }),
    ScheduleModule.forRoot(),
    MulterModule.register({ dest: './upload' }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'client'),
      renderPath: '/',
      exclude: ['api', 'api/**'],
    }),
    TaskModule,
  ],
})
export class AppModule { }
