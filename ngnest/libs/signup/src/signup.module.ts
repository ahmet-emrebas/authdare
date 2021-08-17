import { SignupEntity } from './signup.entity';
import { Module, DynamicModule, Global } from '@nestjs/common';
import { SignupService, SignupDetailsService, PublicUserService } from './signup.service';
import { SignupController } from './signup.controller';
import { ConnectionModule } from '@authdare/common/db';
import { SignupDetailsEntity } from './signup-details.entity';
import { SignupDetailsController } from './signup-details.controller';
import { PublicUserController } from './public-users.controller';
import { PublicUserEntity } from './public-user.entity';

@Global()
@Module({})
export class SignupModule {
    static configure(): DynamicModule {
        return {
            module: SignupModule,
            imports: [
                ConnectionModule.configure('signup', [
                    SignupEntity,
                    SignupDetailsEntity,
                    PublicUserEntity,
                ]),
            ],
            controllers: [SignupController, SignupDetailsController, PublicUserController],
            providers: [SignupService, SignupDetailsService, PublicUserService],
            exports: [SignupService, SignupDetailsService, PublicUserService],
        };
    }
}
