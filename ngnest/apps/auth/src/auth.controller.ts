import { GLOBAL_CONNECTION_TOKEN } from '@authdare/common/module';
import { Body, Controller, Inject, Post, Session } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventEmitter2 } from 'eventemitter2';

export type AuthActionHandlerArgument<Connection, EventEmitter, Form, TSession> = {
    connection: Connection;
    form: Form;
    session: TSession;
    eventEmitter: EventEmitter;
};

export type AuthActionHandler<
    Connection = any,
    EventEmitter = any,
    Form = any,
    TSession = any,
    ReturnType = any,
> = (arg: AuthActionHandlerArgument<Connection, EventEmitter, Form, TSession>) => ReturnType;

class EmptyClass {}

export const LoginHandlerToken = 'LoginHandlerToken';
export const SignupHandlerToken = 'SignupHandlerToken';
export const ForgotPasswordHandlerToken = 'ForgotPasswordHandlerToken';

@ApiTags(AuthController.name)
@Controller('auth')
export class AuthController {
    constructor(
        @Inject(LoginHandlerToken) private readonly loginHandler: AuthActionHandler,
        @Inject(SignupHandlerToken) private readonly signupHandler: AuthActionHandler,
        @Inject(ForgotPasswordHandlerToken)
        private readonly forgotPasswordHandler: AuthActionHandler,
        @Inject(GLOBAL_CONNECTION_TOKEN) private readonly connection: any,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    @Post('login')
    async login(@Body() form: EmptyClass, @Session() session: any) {
        return await this.loginHandler({
            form,
            session,
            eventEmitter: this.eventEmitter,
            connection: this.connection,
        });
    }

    @Post('signup')
    async signup(@Body() form: EmptyClass, @Session() session: any) {
        return await this.signupHandler({
            form,
            session,
            eventEmitter: this.eventEmitter,
            connection: this.connection,
        });
    }

    @Post('forgot-password')
    async forgotPassword(@Body() form: any, @Session() session: any) {
        return await this.forgotPasswordHandler({
            form,
            session,
            eventEmitter: this.eventEmitter,
            connection: this.connection,
        });
    }
}
