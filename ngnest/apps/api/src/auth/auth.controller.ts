import { AuthInterceptor } from './auth.interceptor';

import {
    Body,
    Controller,
    Inject,
    InternalServerErrorException,
    Param,
    Post,
    Session,
    UseInterceptors,
} from '@nestjs/common';
import {
    ApiConflictResponse,
    ApiNotAcceptableResponse,
    ApiNotFoundResponse,
    ApiTags,
} from '@nestjs/swagger';
import { SessionData } from 'express-session';
import { IAuthController, ResourcePolicy } from '@authdare/common/decorator';
import { Connection } from 'typeorm';
import { DatabaseTokens } from '../database/database-tokens';
import { ForgotPasswordForm, FormValidationPipe, LoginForm, SignupForm } from './forms';
import { AuthService } from './auth.service';

@UseInterceptors(AuthInterceptor)
@ApiTags(AuthController.name)
@Controller({ path: 'auth' })
export class AuthController implements IAuthController {
    constructor(private authService: AuthService) {}

    @ApiNotFoundResponse({ description: 'When account with the email already exits' })
    @ApiNotAcceptableResponse({
        description: 'When input validation fails',
    })
    @ResourcePolicy({ public: true })
    @Post(':orgname/join')
    join(@Body() form: SignupForm, @Param('orgname') orgname: string) {
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
        @Session() session: SessionData,
        @Param('orgname') orgname: string,
    ) {}

    @ApiConflictResponse({ description: 'When account with the email & orgname already exists.' })
    @ApiNotAcceptableResponse({
        description: 'When initial validation fails',
    })
    @ResourcePolicy({ public: true })
    @Post('signup')
    async signup(@Body(FormValidationPipe) form: SignupForm, @Session() session: SessionData) {
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
        @Session() session: SessionData,
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
