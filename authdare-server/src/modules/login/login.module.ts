import { LoginService } from './login.service';
import { LoginController, LOGIN_SERVICE_TOKEN } from './login.controller';
import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class LoginModule {
    /**
     * @param loginService Class of LoginServiceImplementation
     * @returns 
     */
    static register(loginService: typeof LoginService): DynamicModule {
        return {
            module: LoginModule,
            controllers: [LoginController],
            providers: [
                {
                    provide: LOGIN_SERVICE_TOKEN,
                    useClass: loginService
                }
            ]
        }

    }
}
