import { DatabaseService } from './../../database/src/database.service';
import { t } from '@authdare/common/type';
import { Body, Controller, Inject, Param, Post, Session } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventEmitter2 } from 'eventemitter2';
import { SessionData } from 'express-session';
import { Repository } from 'typeorm';
import { UserEntity } from '@authdare/models/user';
import { InjectRepository } from '@nestjs/typeorm';

export class AuthActionHandlerArgument<Form = any, TSession = any> {
    form = t<Form>();
    session = t<TSession>();
    eventEmitter = t<EventEmitter2>();
    orgname = t<string>();
    databaseService?: DatabaseService;
    userRepository?: Repository<UserEntity>;
}

export type AuthActionHandler<Form = any, TSession = any, ReturnType = any> = (
    arg: AuthActionHandlerArgument<Form, TSession>,
) => ReturnType;

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
        private readonly eventEmitter: EventEmitter2,
        private readonly databaseService: DatabaseService,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) {}

    @Post('login')
    async login(
        @Body() form: EmptyClass = t<EmptyClass>({}),
        @Session() session: SessionData = t<any>(),
        @Param('orgname') orgname: string = t<string>(''),
    ) {
        return await this.loginHandler({
            form,
            session,
            eventEmitter: this.eventEmitter,
            userRepository: this.userRepository,
            orgname,
        });
    }

    @Post('signup')
    async signup(
        @Body() form: EmptyClass = t<EmptyClass>({}),
        @Session() session: SessionData = t<any>(),
        @Param('orgname') orgname: string = t<string>(),
    ) {
        return await this.signupHandler({
            form,
            session,
            eventEmitter: this.eventEmitter,
            userRepository: this.userRepository,
            orgname,
            databaseService: this.databaseService,
        });
    }

    @Post('forgot-password')
    async forgotPassword(
        @Body() form: EmptyClass = t<EmptyClass>({}),
        @Session() session: SessionData = t<any>(),
        @Param('orgname') orgname: string = t<string>(),
    ) {
        return await this.forgotPasswordHandler({
            form,
            session,
            eventEmitter: this.eventEmitter,
            userRepository: this.userRepository,
            orgname,
        });
    }
}
