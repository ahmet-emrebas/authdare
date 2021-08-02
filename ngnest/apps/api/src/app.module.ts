import { AppResourceController } from './app-resource.controller';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MulterModule } from '@nestjs/platform-express';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService, AuthControler } from '@authdare/auth';
import { DATABASE_MANAGER_TOKEN, SQLiteDatabasaManager, TaskEntity, UserEntity, UserPermission } from '@authdare/models';


/**
 * Add new entities here. 
 */
const sqlite = new SQLiteDatabasaManager(
  [UserEntity, TaskEntity],
  { permissionClass: UserPermission }
);

const sqliteProvider = {
  provide: DATABASE_MANAGER_TOKEN,
  useValue: sqlite,
};

@Module({
  controllers: [AppResourceController, AuthControler],
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/authdare/main.sqlite',
      synchronize: true,
      dropSchema: true,
      entities: sqlite.getEntities(),
    }),
    TypeOrmModule.forFeature(sqlite.getEntities()),
    JwtModule.register({ secret: 'secret' }),
    ScheduleModule.forRoot(),
    MulterModule.register({ dest: './upload' }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
  ],
  providers: [sqliteProvider, AuthService]
})
export class AppModule { }
