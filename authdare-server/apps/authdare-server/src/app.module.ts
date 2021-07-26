import {
  AdminProfileModule,
  PublicProfileModule,
  FreeProfileModule,
  CommunityProfileModule,
  ADMIN_PROFILE,
  PUBLIC_PROFILE,
  FREE_PROFILE,
  COMMUNITY_PROFILE,
  DEV_PROFILE,
  DevProfileModule,
} from './profiles';
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CONNECTION_OPTIONS_TOKEN, ENTITIES_TOKEN, ProfilesModule } from '@authdare/core';
import { AuthMiddleware } from '@authdare/middleware';
import { CommonModules, DBConnectionOptions } from './app-common.module';
import { Org, User } from '@authdare/models';

@Module({
  imports: [
    ...CommonModules,
    ProfilesModule.profiles(DEV_PROFILE, [
      { profile: ADMIN_PROFILE, module: AdminProfileModule },
      { profile: PUBLIC_PROFILE, module: PublicProfileModule },
      { profile: FREE_PROFILE, module: FreeProfileModule },
      { profile: COMMUNITY_PROFILE, module: CommunityProfileModule },
      { profile: DEV_PROFILE, module: DevProfileModule },
    ]),

  ],
  providers: [
    {
      provide: CONNECTION_OPTIONS_TOKEN,
      useValue: DBConnectionOptions
    },
    {
      provide: ENTITIES_TOKEN,
      useValue: {
        users: User,
        orgs: Org
      }
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .forRoutes('**')
  }
}
