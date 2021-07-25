import { LoginService, LOGIN_SERVICE_TOKEN } from './login.service';
import { LoginController } from './login.controller';
import { DynamicModule, Module, Provider } from '@nestjs/common';

export type LoginModuleOptions = {
    service: typeof LoginService,
    controller: typeof LoginController
}


/**
 * @path /login
 */
@Module({})
export class LoginModule {
    /**
     * @param loginService Class of LoginServiceImplementation
     * @returns 
     */
    static register({ service, controller }: Partial<LoginModuleOptions>): DynamicModule {
        const serviceProvider: Provider = {
            provide: LOGIN_SERVICE_TOKEN,
            useClass: service || LoginService
        }
        return {
            module: LoginModule,
            controllers: [controller || LoginController],
            providers: [
                serviceProvider
            ],
            exports: [serviceProvider]
        }

    }
}
