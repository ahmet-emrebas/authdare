import { SignupService, SIGNUP_SERVICE_TOKEN } from './signup.service';
import { SignupController } from './signup.controller';
import { DynamicModule, Module, Provider } from '@nestjs/common';

export type SignupModuleOptions = {
    service: typeof SignupService,
    controller: typeof SignupController
}

/**
 * @path /signup
 */
@Module({})
export class SignupModule {
    /**
     * @param signupService Class of SignupServiceImplementation
     * @returns 
     */
    static register({ service, controller }: Partial<SignupModuleOptions>): DynamicModule {
        const serviceProvider: Provider = {
            provide: SIGNUP_SERVICE_TOKEN,
            useClass: service || SignupService
        }
        return {
            module: SignupModule,
            controllers: [controller || SignupController],
            providers: [
                serviceProvider
            ],
            exports: [serviceProvider]
        }

    }
}
