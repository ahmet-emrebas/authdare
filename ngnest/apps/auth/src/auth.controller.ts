import { DatabaseTokens } from './../../database/src/database-tokens';
import { AuthInterceptor } from './auth.interceptor';
import { IAuthController } from './../../../libs/common/src/decorator/handler-options';
import { Length, IsEmail, IsOptional, isNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { t } from '@authdare/common/type';
import {
    Body,
    Controller,
    Inject,
    InternalServerErrorException,
    Param,
    Post,
    Session,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import {
    ApiConflictResponse,
    ApiNotAcceptableResponse,
    ApiNotFoundResponse,
    ApiProperty,
    ApiTags,
} from '@nestjs/swagger';
import { SessionData } from 'express-session';
import { CommonConstructor } from '@authdare/common/class';
import { ResourcePolicy } from '@authdare/common/decorator';
import { Connection } from 'typeorm';

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
    @IsOptional()
    permissions = t<string>();

    @ApiProperty({ type: 'string', minLength: 1, maxLength: 100, required: true })
    @Length(3, 50)
    @Transform(({ value }) =>
        isNotEmpty(value) ? `authdare_` + value + '_' + new Date().getTime() : value,
    )
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

const FormValidationPipe = new ValidationPipe({
    transform: true,
});

@UseInterceptors(AuthInterceptor)
@ApiTags(AuthController.name)
@Controller({ path: 'auth' })
export class AuthController implements IAuthController {
    constructor(@Inject(DatabaseTokens.CLIENT_CONNECTION) con: Connection) {}

    @ApiNotFoundResponse({ description: 'When account with the email already exits' })
    @ApiNotAcceptableResponse({
        description: 'When input validation fails',
    })
    @ResourcePolicy({ public: true })
    @Post(':orgname/join')
    join(@Body() form: LoginForm, @Param('orgname') orgname: string) {
        throw new InternalServerErrorException('Something went wrong.');
    }

    @ApiNotFoundResponse({ description: 'When account with the email does not exist.' })
    @ApiNotAcceptableResponse({
        description: 'When password is wrong or initial input validation fails.',
    })
    @ResourcePolicy({ public: true })
    @Post(':orgname/login')
    async login(
        @Body(FormValidationPipe) form: LoginForm,
        @Session() session: SessionData = t<any>(),
        @Param('orgname') orgname: string = t<string>(''),
    ) {}

    @ApiConflictResponse({ description: 'When account with the email & orgname already exists.' })
    @ApiNotAcceptableResponse({
        description: 'When initial validation fails',
    })
    @ResourcePolicy({ public: true })
    @Post('signup')
    async signup(
        @Body(FormValidationPipe) form: SignupForm,
        @Session() session: SessionData = t<any>(),
    ) {
        throw new InternalServerErrorException('Something went wrong!');
    }

    @ApiNotFoundResponse({ description: 'When account with the email does not exist.' })
    @ApiNotAcceptableResponse({
        description: 'When initial validation fails',
    })
    @ResourcePolicy({ public: true })
    @Post('forgot-password')
    async forgotPassword(
        @Body(FormValidationPipe) form: ForgotPasswordForm,
        @Session() session: SessionData = t<any>(),
    ) {
        throw new InternalServerErrorException('Something went wrong!');
    }

    @ResourcePolicy({ public: true })
    @Post('request-one-time-login-code')
    requestOneTimeLoginCode(...args: any[]) {
        throw new InternalServerErrorException('Something went wrong!');
    }

    @ResourcePolicy({ permission: 'update users' })
    @Post('update-profile')
    updateProfile(...args: any[]) {
        throw new InternalServerErrorException('Something went wrong!');
    }
}
