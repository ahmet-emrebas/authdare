import { AppResourceController } from './app-resource.controller';
import { Inject, Module, Logger } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MulterModule } from '@nestjs/platform-express';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtModule } from '@nestjs/jwt';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { AuthService, AuthControler } from '@authdare/auth';
import { DatabaseManager, DATABASE_MANAGER_TOKEN, SQLiteDatabasaManager, TaskEntity, UserEntity, UserPermission } from '@authdare/models';
import { Repository } from 'typeorm';

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
export class AppModule {
  constructor(
    @Inject(DATABASE_MANAGER_TOKEN) dbm: DatabaseManager,
    @InjectRepository(UserEntity) userRepo: Repository<UserEntity>) {

    userRepo.save(new UserEntity({ email: 'aemrebas.dev@gmail.com', orgname: 'authdare', password: 'mypassword', permissions: dbm.adminPermissions() }))
      .then(saved => {
        Logger.log(`Created admin user ${saved}. `,)
      })

  }
}
