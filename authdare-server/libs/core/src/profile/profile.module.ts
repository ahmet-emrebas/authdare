import { DynamicModule, Logger, Module } from '@nestjs/common';
import { yellow } from 'chalk';
import { getProfile } from './get-profile';

export const APP_PROFILE_TOKEN = 'f234kdviu90238423';

export interface ProfileModuleOptions extends DynamicModule {
  /**
   * Name of the profile
   */
  profile?: string;
}

@Module({})
export class ProfilesModule {
  static profiles(
    fallBackProfile: string,
    options: ProfileModuleOptions[],
  ): DynamicModule {
    const selectedProfile = getProfile(fallBackProfile);
    let profileOptions = options.find((e) => e.profile == selectedProfile);

    profileOptions = {
      ...profileOptions,
      providers: [
        ...(profileOptions.providers || []),
        {
          provide: APP_PROFILE_TOKEN,
          useValue: selectedProfile,
        },
      ],
    };

    Logger.log(
      `Application started under ${yellow(selectedProfile)} ${yellow(
        'Profile',
      )}`,
      'Profiles',
    );

    return {
      module: ProfilesModule,
      ...profileOptions,
    };
  }
}
