import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
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
      rootPath: join(__dirname, '..', 'client'),
      renderPath: '/',
      exclude: ['api', 'api/**'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
