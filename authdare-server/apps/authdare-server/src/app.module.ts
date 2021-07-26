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
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from '@authdare/core';

@Module({
  imports: [
    ProfilesModule.profiles(DEV_PROFILE, [
      { profile: ADMIN_PROFILE, module: AdminProfileModule },
      { profile: PUBLIC_PROFILE, module: PublicProfileModule },
      { profile: FREE_PROFILE, module: FreeProfileModule },
      { profile: COMMUNITY_PROFILE, module: CommunityProfileModule },
      { profile: DEV_PROFILE, module: DevProfileModule },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
