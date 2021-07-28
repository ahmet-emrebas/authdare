import { PermissionModule } from './permission/permission.module';
import { UserModule } from './user';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MulterModule } from '@nestjs/platform-express';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getModelMap } from '@authdare/base';
import { values } from 'lodash';
import { AppResourceModule } from './app-resource.module';
import { AuthModule } from '@authdare/auth';
import { RoleModule } from './role';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    AppResourceModule.register(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          type: 'sqlite',
          database: 'database/authdare/main.sqlite',
          entities: values(await getModelMap()).map((e) => e.entity),
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
  ],
})
export class AppModule {}
