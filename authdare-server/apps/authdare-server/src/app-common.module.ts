import { JwtModule } from '@nestjs/jwt';
import { ConnectionOptions } from 'typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule, genSecret } from '@authdare/auth';
import { Org, User } from '@authdare/models';
import { DBResourceManagerModule, getProfile } from '@authdare/core';
import { AuthUserResourceService } from './auth-resources';
import { DEV_PROFILE } from './profiles';


export const DBConnectionOptions: ConnectionOptions = {
  type: 'sqlite',
  database: 'database/authdare.sqlite',
  entities: [User, Org],
  synchronize: true,
  dropSchema: true,
}

export const DefaultJWTModule = JwtModule.registerAsync({
  useFactory: async () => {
    return {
      secret: getProfile(DEV_PROFILE) == DEV_PROFILE ? 'secret' : await genSecret(),
    };
  },
});

export const CommonModules = [
  DBResourceManagerModule.register(DBConnectionOptions),
  ScheduleModule.forRoot(),
  MulterModule.register({ dest: './upload', }),
  ThrottlerModule.forRoot({ ttl: 60, limit: 10, }),
  ServeStaticModule.forRoot({ rootPath: join(__dirname, 'client'), renderPath: '/', exclude: ['api', 'api/**'], }),
  DefaultJWTModule,
  AuthModule.register({ userResourceService: AuthUserResourceService, jwtModule: DefaultJWTModule, imports: [TypeOrmModule.forFeature([User])], }),
];
