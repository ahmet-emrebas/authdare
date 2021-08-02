import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MulterModule } from '@nestjs/platform-express';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService, AuthControler } from '@authdare/auth';
import { ResourceController } from '@authdare/resources';
import { DATABASE_MANAGER_TOKEN, SQLiteDatabasaManager, TaskEntity, UserEntity, UserPermission } from '@authdare/models';

const sqlite = new SQLiteDatabasaManager([UserEntity, TaskEntity], {
  methods: ['get', 'post', 'put', 'delete', 'patch'],
  permissionClass: UserPermission,
});

const sqliteProvider = {
  provide: DATABASE_MANAGER_TOKEN,
  useValue: sqlite,
};

@Module({
  controllers: [ResourceController, AuthControler],
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
  providers: [sqliteProvider, AuthService],
})
export class AppModule { }
