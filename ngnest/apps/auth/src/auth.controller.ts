import { Body, Controller, Inject, Post, Session } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export type LoginHandler<Form = any, Session = any, ReturnType = any> = (
    loginForm: Form,
    session: Session,
) => ReturnType;
export type SignupHandler<Form = any, Session = any, ReturnType = any> = (
    signupForm: Form,
    session: Session,
) => ReturnType;

export type ForgotPasswordHandler<Form = any, Session = any, ReturnType = any> = (
    forgotPasswordForm: Form,
) => ReturnType;

export const LoginHandlerToken = 'LoginHandlerToken';
export const SignupHandlerToken = 'SignupHandlerToken';
export const ForgotPasswordHandlerToken = 'ForgotPasswordHandlerToken';

@ApiTags(AuthController.name)
@Controller('auth')
export class AuthController {
    constructor(
        @Inject(LoginHandlerToken) private readonly loginHandler: LoginHandler,
        @Inject(SignupHandlerToken) private readonly signupHandler: SignupHandler,
        @Inject(ForgotPasswordHandlerToken)
        private readonly forgotPasswordHandler: ForgotPasswordHandler,
    ) {}

    @Post('login')
    async login(@Body() loginForm: any, @Session() session: any) {
        return await this.loginHandler(loginForm, session);
    }

    @Post('signup')
    async signup(@Body() signupForm: any, @Session() session: any) {
        return await this.signupHandler(signupForm, session);
    }

    @Post('forgot-password')
    async forgotPassword(@Body() form: any) {
        return await this.forgotPasswordHandler(form);
    }
}
