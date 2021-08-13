import { Length, IsEmail, IsOptional } from 'class-validator';
import { DatabaseService } from './../../database/src/database.service';
import { t } from '@authdare/common/type';
import { Body, Controller, Inject, Param, Post, Session, ValidationPipe } from '@nestjs/common';
import {
    ApiConflictResponse,
    ApiNotAcceptableResponse,
    ApiNotFoundResponse,
    ApiProperty,
    ApiTags,
} from '@nestjs/swagger';
import { EventEmitter2 } from 'eventemitter2';
import { SessionData } from 'express-session';
import { Repository } from 'typeorm';
import { UserEntity } from '@authdare/models/user';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonConstructor } from '@authdare/common/class';

export class AuthActionHandlerArgument<Form = any, TSession = any> {
    form = t<Form>();
    session = t<TSession>();
    eventEmitter = t<EventEmitter2>();
    orgname? = t<string>();
    databaseService? = t<DatabaseService>();
    userRepository? = t<Repository<UserEntity>>();
}

export type AuthActionHandler<Form = any, TSession = any, ReturnType = any> = (
    arg: AuthActionHandlerArgument<Form, TSession>,
) => ReturnType;

class EmptyClass {}

export const LoginHandlerToken = 'LoginHandlerToken';
export const SignupHandlerToken = 'SignupHandlerToken';
export const ForgotPasswordHandlerToken = 'ForgotPasswordHandlerToken';

export class SignupForm extends CommonConstructor<SignupForm> {
    @ApiProperty({ type: 'string', minLength: 1, maxLength: 100, required: true })
    @Length(1, 100)
    firstName = t<string>();

    @ApiProperty({ type: 'string', minLength: 1, maxLength: 100, required: true })
    @Length(1, 100)
    lastName = t<string>();

    @ApiProperty({ type: 'string', minLength: 1, maxLength: 100, required: true, format: 'email' })
    @IsEmail()
    email = t<string>();

    @ApiProperty({ type: 'string', minLength: 1, maxLength: 100, required: true })
    @Length(6, 100)
    password = t<string>();

    @ApiProperty({ type: 'string', minLength: 1, maxLength: 100, required: true })
    @Length(3, 20)
    orgname = t<string>();
}

export class LoginForm {
    @ApiProperty({ type: 'string', minLength: 1, maxLength: 100, required: true, format: 'email' })
    @IsEmail()
    email = t<string>();

    @ApiProperty({ type: 'string', minLength: 1, maxLength: 100, required: true })
    @Length(6, 100)
    password = t<string>();
}

export class ForgotPasswordForm {
    @ApiProperty({ type: 'string', minLength: 1, maxLength: 100, required: false, format: 'email' })
    @IsEmail()
    email = t<string>();

    @ApiProperty({ type: 'string', minLength: 1, maxLength: 100, required: false })
    @Length(10, 100)
    @IsOptional()
    code = t<string>();
}

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

    @ApiNotFoundResponse({ description: 'When account with the email does not exist.' })
    @ApiNotFoundResponse({
        description: 'When password is wrong or initial input validation fails.',
    })
    @Post('login')
    async login(
        @Body(new ValidationPipe()) form: LoginForm,
        @Session() session: SessionData = t<any>(),
        @Param('orgname') orgname: string = t<string>(''),
    ) {
        return await this.loginHandler({
            form,
            session,
            eventEmitter: this.eventEmitter,
            userRepository: this.userRepository,
        });
    }

    @ApiConflictResponse({ description: 'When account with the email & orgname already exists.' })
    @ApiNotAcceptableResponse({
        description: 'When initial validation fails',
    })
    @Post('signup')
    async signup(
        @Body(new ValidationPipe()) form: SignupForm,
        @Session() session: SessionData = t<any>(),
    ) {
        return await this.signupHandler({
            form,
            session,
            eventEmitter: this.eventEmitter,
            userRepository: this.userRepository,
            databaseService: this.databaseService,
        });
    }

    @ApiNotFoundResponse({ description: 'When account with the email does not exist.' })
    @ApiNotAcceptableResponse({
        description: 'When initial validation fails',
    })
    @Post('forgot-password')
    async forgotPassword(
        @Body(new ValidationPipe()) form: ForgotPasswordForm,
        @Session() session: SessionData = t<any>(),
    ) {
        return await this.forgotPasswordHandler({
            form,
            session,
            eventEmitter: this.eventEmitter,
            userRepository: this.userRepository,
        });
    }
}
