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
import { AuthTasksService } from './auth-tasks.service';
import { EventEmitterModule } from '@nestjs/event-emitter';


@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
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
    AuthTasksService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AuthModule {

}
