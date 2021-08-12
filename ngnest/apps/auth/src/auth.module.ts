import { DynamicModule, Module } from '@nestjs/common';
import {
    AuthController,
    ForgotPasswordHandler,
    ForgotPasswordHandlerToken,
    LoginHandler,
    LoginHandlerToken,
    SignupHandler,
    SignupHandlerToken,
} from './auth.controller';

@Module({})
export class AuthModule {
    async init(
        loginHandler: LoginHandler,
        signupHandler: SignupHandler,
        forgotPasswordHandler: ForgotPasswordHandler,
    ): Promise<DynamicModule> {
        return {
            module: AuthModule,
            imports: [],
            controllers: [AuthController],
            providers: [
                { provide: ForgotPasswordHandlerToken, useValue: forgotPasswordHandler },
                { provide: LoginHandlerToken, useValue: loginHandler },
                { provide: SignupHandlerToken, useValue: signupHandler },
            ],
        };
    }
}
