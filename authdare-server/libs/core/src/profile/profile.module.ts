import { DynamicModule, Logger, Module } from '@nestjs/common';
import { yellow } from 'chalk';
import { getProfile } from './get-profile';


export interface ProfileModuleOptions extends DynamicModule {
    /**
     * Name of the profile
     */
    profile?: string;
}

@Module({})
export class ProfilesModule {
    static profiles(fallBackProfile: string, options: ProfileModuleOptions[]): DynamicModule {
        let selectedProfile = getProfile() || fallBackProfile;
        let profileOptions = options.find(e => e.profile == selectedProfile);

        Logger.log(`Application started under ${yellow(selectedProfile)} ${yellow('Profile')}`, 'Profiles')

        return {
            module: ProfilesModule,
            ...profileOptions
        }
    }
}
