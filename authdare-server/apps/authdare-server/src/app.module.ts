import { ApiGuard } from './guards/api.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './controllers';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { Module } from '@nestjs/common';
import { DatabaseEntity, OrgEntity, PermissionEntity, RoleEntity, UserEntity } from '@authdare/database';

@Module({
  controllers: [ApiController],
  providers: [ApiGuard],
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/authdare/main.sqlite',
      entities: [DatabaseEntity, OrgEntity, PermissionEntity, RoleEntity, UserEntity]
    }),
    ScheduleModule.forRoot(),
    MulterModule.register({ dest: './upload', }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 10, }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'client'),
      renderPath: '/',
      exclude: ['api', 'api/**'],
    }),
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: 'secret'
        };
      },
    })
  ],
})
export class AppModule {

}
