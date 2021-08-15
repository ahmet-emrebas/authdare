import { Module, Global, DynamicModule } from '@nestjs/common';
import { ProvideRepositories, uuid } from '@authdare/common/util';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { SignupEntity, SubscriptionDetails } from './signup.entity';

@Global()
@Module({})
export class SignupModule {
    static async configure(
        type = 'postgres' as any,
        url = 'postgres://postgres:password@localhost',
        database = 'signup',
    ): Promise<DynamicModule> {
        return {
            module: SignupModule,
            controllers: [SignupController],
            providers: [
                SignupService,
                ...ProvideRepositories({
                    name: uuid(),
                    type,
                    url,
                    database,
                    entities: [SignupEntity, SubscriptionDetails],
                    synchronize: true,
                }),
            ],
            exports: [SignupService],
        };
    }
}
