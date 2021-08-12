import { UserEntity } from './../../../libs/models/src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicModule, Module } from '@nestjs/common';
import {
    AuthActionHandler,
    AuthController,
    ForgotPasswordHandlerToken,
    LoginHandlerToken,
    SignupHandlerToken,
} from './auth.controller';

export type AuthModuleOptions = {
    loginHandler: AuthActionHandler;
    signupHandler: AuthActionHandler;
    forgotPasswordHandler: AuthActionHandler;
};

@Module({})
export class AuthModule {
    static async init({
        loginHandler,
        signupHandler,
        forgotPasswordHandler,
    }: AuthModuleOptions): Promise<DynamicModule> {
        return {
            module: AuthModule,
            imports: [TypeOrmModule.forFeature([UserEntity])],
            controllers: [AuthController],
            providers: [
                { provide: ForgotPasswordHandlerToken, useValue: forgotPasswordHandler },
                { provide: LoginHandlerToken, useValue: loginHandler },
                { provide: SignupHandlerToken, useValue: signupHandler },
            ],
        };
    }
}
