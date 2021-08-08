import { QueryUserDTO, QueryUserValidationPipe } from './user/dto/query-user.dto';
import { AuthRoutes } from './auth-routes';
import { ResourceTypeTokens } from './decorators/resource-type-tokens';
import { ForgotPasswordService } from './services/forgot-password.service';
import { UserService } from './services/user.service';
import { UpdateUserValidationPipe } from './user/dto/update-user.dto';
import { SignupService } from './services/signup.service';
import { AuthGuard } from './guards/auth.guard';
import { Body, Controller, Get, Logger, Post, Session, UseGuards, Patch, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
    LoginDTO,
    CreateTeamMemberDTO,
    LoginValidationPipe,
    CreateTeamMemberValidationPipe,
    SignupValidationPipe,
    SignupDTO,
    ForgotPasswordDTO,
    ForgotPasswordValidationPipe,
    UpdateUserDTO,
} from './user';
import { LoginService } from './services/login.service';
import { PublicPolicy } from './decorators';
import { message } from '@authdare/utils';
import { SessionKeys } from './session-keys';
import { PermissionPolicy, ResourceType } from './decorators';
import { omit } from 'lodash';

@ApiTags(AuthController.name)
@UseGuards(AuthGuard)
@ResourceType(ResourceTypeTokens.AUTH)
@Controller(AuthRoutes.BASE)
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(
        private readonly loginService: LoginService,
        private readonly signupService: SignupService,
        private readonly forgotPasswordService: ForgotPasswordService,
        private readonly userService: UserService,
    ) {}

    @Get(AuthRoutes.PROFILE)
    async seeProfile(@Session() session: any) {
        try {
            const { orgname, email } = session[SessionKeys.USER];
            return omit(await this.userService.findOne({ where: { orgname, email } }), 'password');
        } catch (err) {
            return { message: 'What?' };
        }
    }

    @PublicPolicy()
    @Post(AuthRoutes.LOGIN)
    async login(@Body(LoginValidationPipe) body: LoginDTO, @Session() session: any) {
        const { password, ...withoutPassword } = await this.loginService.login(body);
        session[SessionKeys.USER] = withoutPassword;
        return message('Welcome Back!');
    }

    @PublicPolicy()
    @Post(AuthRoutes.SIGNUP)
    async signup(@Body(SignupValidationPipe) userdata: SignupDTO, @Session() session: any) {
        const { password, ...withoutPassword } = await this.signupService.signup(userdata);
        session[SessionKeys.USER] = withoutPassword;
        return message('Welcome!');
    }

    @PublicPolicy()
    @Post(AuthRoutes.FORGOT_PASSWORD)
    async forgotPassword(@Body(ForgotPasswordValidationPipe) body: ForgotPasswordDTO) {
        return await this.forgotPasswordService.forgotPassword(body);
    }

    @Patch(AuthRoutes.UPDATE_PROFILE)
    async updateProfile(@Body(UpdateUserValidationPipe) body: UpdateUserDTO, @Session() session: any) {
        await this.userService.update(session[SessionKeys.USER].id, body);
        return message('Updated profile.');
    }

    @PermissionPolicy('post:users')
    @Post(AuthRoutes.CREATE_MEMBER)
    async postUser(@Body(CreateTeamMemberValidationPipe) body: CreateTeamMemberDTO, @Session() session: any) {
        return await this.userService.create(body);
    }

    @PermissionPolicy('get:users')
    @Post(AuthRoutes.GET_USERS)
    async get(@Query(QueryUserValidationPipe) _query: QueryUserDTO, @Session() session: any) {
        const query = _query || {};
        return await (await this.userService.find({ take: 20, where: query })).map((e) => omit(e, 'password'));
    }
}
