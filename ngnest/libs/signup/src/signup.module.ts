import { SignupEntity, SubscriptionDetails } from './signup.entity';
import { Module, DynamicModule } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { RepositoryProvider } from '@authdare/common/db/repository.provider';
import { AUTH_CONNECTION_OPTIONS } from '@authdare/common/db/connection-tokens';

@Module({})
export class SignupModule {
    static configure(): DynamicModule {
        return {
            module: SignupModule,

            controllers: [SignupController],
            providers: [
                SignupService,
                ...RepositoryProvider('asdfasdf', AUTH_CONNECTION_OPTIONS, [
                    SignupEntity,
                    SubscriptionDetails,
                ]),
            ],
            exports: [SignupService],
        };
    }
}
