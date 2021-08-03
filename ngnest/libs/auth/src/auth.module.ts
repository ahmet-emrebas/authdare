import { AuthController } from './auth.controller';
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubEntity } from './sub';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { delay } from '@authdare/utils';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule'
import { AuthCronService } from './auth-cron.service'
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthEventsService } from './auth-events.service';


@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot({

      // set this to `true` to use wildcards
      wildcard: true,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,

    }),
    CacheModule.register({
      ttl: 10,
      max: 20
    }),
    ScheduleModule.forRoot(),
    JwtModule.register({ secret: 'secret' }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await delay(1000);
        return {
          name: AuthModule.name,
          type: 'sqlite',
          database: 'database/auth/main.sqlite',
          entities: [SubEntity],
          synchronize: true,
          dropSchema: true,
        }
      }
    }),
    TypeOrmModule.forFeature([SubEntity])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthCronService,
    AuthEventsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AuthModule {

}
