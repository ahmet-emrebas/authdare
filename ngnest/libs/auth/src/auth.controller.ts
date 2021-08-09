import { ProviderTokens } from './provider-tokens';
import { QueryUserDTO, QueryUserValidationPipe } from './user/dto/query-user.dto';
import { AuthRoutes } from './auth-routes';
import { ResourceTypeTokens } from './decorators/resource-type-tokens';
import { ForgotPasswordService } from './services/forgot-password.service';
import { UserService } from './services/user.service';
import { UpdateUserValidationPipe } from './user/dto/update-user.dto';
import { SignupService } from './services/signup.service';
import { AuthGuard } from './guards/auth.guard';
import {
    Body,
    Controller,
    Get,
    Logger,
    Post,
    Session,
    UseGuards,
    Patch,
    Query,
    Inject,
} from '@nestjs/common';
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
import {
    ApiConflictResponse,
    ApiInternalServerErrorResponse,
    ApiNotAcceptableResponse,
    ApiNotFoundResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags(AuthController.name)
@UseGuards(AuthGuard)
@ResourceType(ResourceTypeTokens.AUTH)
@Controller(AuthRoutes.BASE)
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    private readonly resourcePermissions: any[];
    constructor(
        private readonly loginService: LoginService,
        private readonly signupService: SignupService,
        private readonly forgotPasswordService: ForgotPasswordService,
        private readonly userService: UserService,
        @Inject(ProviderTokens.RESOURCE_PATHS)
        private readonly resourceNames: string[],
    ) {
        this.resourcePermissions = this.resourceNames.map((e) => {
            return {
                name: e,
                permissions: {
                    get: `get:${e}`,
                    post: `post:${e}`,
                    patch: `patch:${e}`,
                    put: `put:${e}`,
                    delete: `delete:${e}`,
                },
            };
        });
    }

    /**
     * View own profile
     * @param session
     * @returns
     */
    @ApiUnauthorizedResponse({
        description: '(401) When user does not have a valid session.',
    })
    @ApiInternalServerErrorResponse({
        description: '(500+) When server cannot operate for internal errors.',
    })
    @Get(AuthRoutes.PROFILE)
    async viewOwnProfile(@Session() session: any) {
        try {
            const { orgname, email } = session[SessionKeys.USER];
            return omit(
                await this.userService.findOne({ where: { orgname, email } }),
                'password',
            );
        } catch (err) {
            return { message: 'What?' };
        }
    }

    /**
     * Login
     * @param body
     * @param session
     * @returns
     */
    @PublicPolicy()
    @ApiNotAcceptableResponse({
        description: '(406) When password is wrong or input validation failed.',
    })
    @ApiNotFoundResponse({ description: '(404) When user does not exit.' })
    @ApiInternalServerErrorResponse({
        description: '(500+) When server cannot operate for internal errors.',
    })
    @Post(AuthRoutes.LOGIN)
    async login(@Body(LoginValidationPipe) body: LoginDTO, @Session() session: any) {
        const { password, ...withoutPassword } = await this.loginService.login(body);
        session[SessionKeys.USER] = withoutPassword;
        return message('Welcome Back!');
    }

    /**
     * Signup
     * @param userdata
     * @param session
     * @returns
     */
    @ApiNotAcceptableResponse({ description: '(406) When input validation failed.' })
    @ApiConflictResponse({
        description: '(409) When database unique constraints fail.',
    })
    @ApiInternalServerErrorResponse({
        description: '(500+) When server cannot operate for internal errors.',
    })
    @PublicPolicy()
    @Post(AuthRoutes.SIGNUP)
    async signup(
        @Body(SignupValidationPipe) userdata: SignupDTO,
        @Session() session: any,
    ) {
        const { password, ...withoutPassword } = await this.signupService.signup(
            userdata,
        );
        session[SessionKeys.USER] = withoutPassword;
        return message('Welcome!');
    }

    /**
     * Password reset request
     * @param body
     * @returns
     */
    @ApiNotFoundResponse({ description: '(404) When user does not exit.' })
    @ApiInternalServerErrorResponse({
        description: '(500+) When server cannot operate for internal errors.',
    })
    @PublicPolicy()
    @Post(AuthRoutes.FORGOT_PASSWORD)
    async forgotPassword(
        @Body(ForgotPasswordValidationPipe) body: ForgotPasswordDTO,
    ) {
        return await this.forgotPasswordService.forgotPassword(body);
    }

    /**
     * Update Profile
     * @param body
     * @param session
     * @returns
     */
    @ApiUnauthorizedResponse({
        description: '(401) When user does not have a valid session.',
    })
    @ApiInternalServerErrorResponse({
        description: '(500+) When server cannot operate for internal errors.',
    })
    @Patch(AuthRoutes.UPDATE_PROFILE)
    async updateProfile(
        @Body(UpdateUserValidationPipe) body: UpdateUserDTO,
        @Session() session: any,
    ) {
        await this.userService.update(session[SessionKeys.USER].id, body);
        return message('Updated profile.');
    }

    /**
     * Post users
     * @param body
     * @param session
     * @returns
     */
    @ApiUnauthorizedResponse({
        description: '(401) When user does not have "post:users" permission',
    })
    @ApiInternalServerErrorResponse({
        description: '(500+) When server cannot operate for internal errors.',
    })
    @PermissionPolicy('post:users')
    @Post(AuthRoutes.CREATE_MEMBER)
    async postUser(
        @Body(CreateTeamMemberValidationPipe) body: CreateTeamMemberDTO,
        @Session() session: any,
    ) {
        return await this.userService.create(body);
    }

    /**
     * Get users
     * @param _query
     * @param session
     * @returns
     */
    @ApiUnauthorizedResponse({
        description: '(401) When user does not have "get:users" permission',
    })
    @ApiInternalServerErrorResponse({
        description: '(500+) When server cannot operate for internal errors.',
    })
    @PermissionPolicy('get:users')
    @Post(AuthRoutes.GET_USERS)
    async get(
        @Query(QueryUserValidationPipe) _query: QueryUserDTO,
        @Session() session: any,
    ) {
        const query = _query || {};
        return await (
            await this.userService.find({ take: 20, where: query })
        ).map((e) => omit(e, 'password'));
    }

    /**
     * List of permissions, this resource requires post:users permissions because this resource is only for who is able to create/update user account.
     * @returns
     */
    @ApiUnauthorizedResponse({
        description:
            '(401) When user does not have  "post:users" & "update:users" permission',
    })
    @ApiInternalServerErrorResponse({
        description: '(500+) When server cannot operate for internal errors.',
    })
    // @PermissionPolicy('post:users')
    @PublicPolicy()
    @Get('permissions')
    permissions() {
        return this.resourcePermissions;
    }
}
