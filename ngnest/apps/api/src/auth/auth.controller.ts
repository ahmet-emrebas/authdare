import { SubscriberEntity } from 'apps/api/src/models/user';
import { AuthInterceptor } from './auth.interceptor';
import {
    Body,
    Controller,
    Param,
    ParseIntPipe,
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
import { IAuthController } from '@authdare/common/interface';
import { ForgotPasswordForm, FormValidationPipe, LoginForm, SignupForm } from './forms';
import { AuthService } from './auth.service';
import { ResourcePolicy } from '@authdare/common/decorator';

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
        return this.authService.join(form);
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
    ) {
        return await this.authService.login(form, session, orgname);
    }

    @ApiConflictResponse({ description: 'When account with the email & orgname already exists.' })
    @ApiNotAcceptableResponse({
        description: 'When initial validation fails',
    })
    @ResourcePolicy({ public: true })
    @Post('signup')
    async signup(@Body(FormValidationPipe) form: SignupForm, @Session() session: SessionData) {
        return await this.authService.signup(form, session);
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
        return await this.authService.forgotPassword(form, session);
    }

    @ResourcePolicy({ public: true })
    @Post('request-one-time-login-code')
    async requestOneTimeLoginCode(@Body() form: ForgotPasswordForm) {
        return await this.authService.requestOneTimeLoginCode(form.email!);
    }

    @ResourcePolicy({ permission: 'update users' })
    @Post('update-profile/:id')
    async updateProfile(@Param('id', ParseIntPipe) id: number, @Body() udpated: SubscriberEntity) {
        return await this.authService.updateProfile(id, udpated);
    }
}
