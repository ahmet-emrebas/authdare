import { SignupEntity } from './signup.entity';
import { Module, DynamicModule, Global } from '@nestjs/common';
import { SignupService, SignupDetailsService, PublicUserService } from './signup.service';
import { SignupController } from './signup.controller';
import { SignupDetailsController } from './signup-details.controller';
import { PublicUserController } from './public-users.controller';
import { ConnectionTokens, provideRepositories } from '@authdare/common/db';
import { PublicUserEntity } from './public-user.entity';
import { SignupDetailsEntity } from './signup-details.entity';

@Global()
@Module({})
export class SignupModule {
    static configure(resourceType: ConnectionTokens): DynamicModule {
        return {
            module: SignupModule,
            controllers: [SignupController, SignupDetailsController, PublicUserController],
            providers: [
                ...provideRepositories(resourceType, [
                    SignupEntity,
                    SignupDetailsEntity,
                    PublicUserEntity,
                ]),
                SignupService,
                SignupDetailsService,
                PublicUserService,
            ],
            exports: [SignupService, SignupDetailsService, PublicUserService],
        };
    }
}
