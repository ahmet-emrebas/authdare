import { Module, DynamicModule } from '@nestjs/common';
import { ProvideRepositories } from '@authdare/common/util';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { SignupEntity, SubscriptionDetails } from './signup.entity';

@Module({})
export class SignupModule {
    static configure(): DynamicModule {
        return {
            module: SignupModule,
            controllers: [SignupController],
            providers: [SignupService, ...ProvideRepositories([SignupEntity, SubscriptionDetails])],
            exports: [SignupService],
        };
    }
}
