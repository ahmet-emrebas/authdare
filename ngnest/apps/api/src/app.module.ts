import { JwtModule } from '@nestjs/jwt';
import { AppResourceController } from './app-resource.controller';
import { Inject, Module, Logger } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MulterModule } from '@nestjs/platform-express';
import { ThrottlerModule } from '@nestjs/throttler';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '@authdare/auth';
import { DatabaseManager, DATABASE_MANAGER_TOKEN, SQLiteDatabasaManager, TaskEntity, UserEntity, UserPermission } from '@authdare/models';
import { Repository } from 'typeorm';
import { AuthModule, PUBLIC_RESOURCES_KEY } from '@authdare/auth/auth.module';

const ENVIRONMENT: string | undefined = process.argv?.
  map(e => e.split("="))?.
  find(e => e[0] == 'ENV')?.pop();


const SQLiteManagerInstance = new SQLiteDatabasaManager(
  [UserEntity, TaskEntity],
  { permissionClass: UserPermission }
);

const DatabaseEntities = SQLiteManagerInstance.getEntities();

const DatabaseManagerProvider = {
  provide: DATABASE_MANAGER_TOKEN,
  useValue: SQLiteManagerInstance,
  global: true,
}

const PublicResourcePathsProvider = {
  provide: PUBLIC_RESOURCES_KEY,
  useValue: ['blogs', 'services'],
  global: true,
}

const GlobalModules = [
  JwtModule.register({ secret: 'secret' }),
  TypeOrmModule.forFeature(DatabaseEntities),
]

const GlobalProviders = [
  DatabaseManagerProvider,
  PublicResourcePathsProvider,
]


@Module({
  controllers: [AppResourceController],
  imports: [
    ...GlobalModules,
    AuthModule.register({ providers: GlobalProviders, imports: GlobalModules }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/authdare/main.sqlite',
      synchronize: true,
      dropSchema: true,
      entities: DatabaseEntities
    }),
    ScheduleModule.forRoot(),
    MulterModule.register({ dest: './upload' }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
  ],
  providers: [DatabaseManagerProvider, PublicResourcePathsProvider, AuthService],
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
