import { TaskEntity } from './models/task.entity';
import { UserEntity, UserPermission } from './models/user.entity';
import { DATABASE_MANAGER_TOKEN, SQLiteDatabasaManager } from './models/database';
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

const sqlite = new SQLiteDatabasaManager(
  [UserEntity, TaskEntity],
  {
    methods: ['get', 'post', 'put', 'delete', 'patch'],
    permissionClass: UserPermission,
  }
)

const sqliteProvider = {
  provide: DATABASE_MANAGER_TOKEN,
  useValue: sqlite,
}

@Module({
  controllers: [ResourceController, AuthControler],
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/authdare/main.sqlite',
      synchronize: true,
      dropSchema: true,
      entities: sqlite.getEntities()
    }),
    TypeOrmModule.forFeature(sqlite.getEntities()),
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
  providers: [
    sqliteProvider,
    AuthService,
  ],
})
export class AppModule {

}
