import { SignupEntity, SubscriptionDetails } from './signup.entity';
import { Module, DynamicModule } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { ConnectionModule } from '@authdare/common/db';

@Module({})
export class SignupModule {
    static configure(): DynamicModule {
        return {
            module: SignupModule,
            imports: [ConnectionModule.configure('signup', [SignupEntity, SubscriptionDetails])],
            controllers: [SignupController],
            providers: [SignupService],
            exports: [SignupService],
        };
    }
}
