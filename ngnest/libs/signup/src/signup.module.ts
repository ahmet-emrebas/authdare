import { Module, DynamicModule, Provider } from '@nestjs/common';
import { ProvideRepositories } from '@authdare/common/util';
import { CommonConstructor } from '@authdare/common/class';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { SignupEntity, SubscriptionDetails } from './signup.entity';

class SignupModuleOptions extends CommonConstructor<SignupModuleOptions> {
    type = 'postgres' as any;
    url = 'postgres://postgres:password@localhost/signup';
    providers: Provider<any>[] = [];
    synchronize = true;
    dropSchema = false;
}

@Module({})
export class SignupModule {
    static async configure(options?: Partial<SignupModuleOptions>): Promise<DynamicModule> {
        const { type, url, providers, synchronize, dropSchema } = {
            ...new SignupModuleOptions(),
            ...options,
        };
        return {
            module: SignupModule,
            controllers: [SignupController],
            providers: [
                SignupService,
                ...ProvideRepositories({
                    name: '39af2873-d498-4061-b2e8-fed4135ea3a0',
                    type,
                    url,
                    entities: [SignupEntity, SubscriptionDetails],
                    autoLoadEntities: true,
                    synchronize,
                    dropSchema,
                } as any),
                ...providers,
            ],
            exports: [SignupService, ...providers],
        };
    }
}
