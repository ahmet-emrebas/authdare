import { ResourceTypeKeys } from './decorators/resource-type-keys';
import { ForgotPasswordService } from './services/forgot-password.service';
import { UserService } from './services/user.service';
import { UpdateUserValidationPipe } from './user/dto/update-user.dto';
import { SignupService } from './services/signup.service';
import { AuthGuard } from './guards/auth.guard';
import { Body, Controller, Get, Logger, Post, Session, UseGuards } from '@nestjs/common';
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

@ApiTags(AuthController.name)
@UseGuards(AuthGuard)
@ResourceType(ResourceTypeKeys.AUTH)
@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(
        private readonly loginService: LoginService,
        private readonly signupService: SignupService,
        private readonly forgotPasswordService: ForgotPasswordService,

        private readonly userService: UserService,
    ) {}

    @Get('profile')
    seeProfile(@Session() session: any) {
        try {
            const { orgname, email } = session[SessionKeys.USER];
            return this.userService.find({ where: { orgname, email } });
        } catch (err) {
            return { message: 'What?' };
        }
    }

    @PublicPolicy()
    @Post('login')
    async login(@Body(LoginValidationPipe) body: LoginDTO, @Session() session: any) {
        const { password, ...withoutPassword } = await this.loginService.login(body);
        session[SessionKeys.USER] = withoutPassword;
        return message('Welcome Back!');
    }

    @PublicPolicy()
    @Post('signup')
    async signup(@Body(SignupValidationPipe) userdata: SignupDTO, @Session() session: any) {
        const { password, ...withoutPassword } = await this.signupService.signup(userdata);
        session[SessionKeys.USER] = withoutPassword;
        return message('Welcome!');
    }

    @PermissionPolicy('post:users')
    @Post('create-member')
    async createTeamMember(@Body(CreateTeamMemberValidationPipe) body: CreateTeamMemberDTO, @Session() session: any) {}

    @PublicPolicy()
    @Post('forgot-password')
    async forgotPassword(@Body(ForgotPasswordValidationPipe) body: ForgotPasswordDTO) {
        return await this.forgotPasswordService.forgotPassword(body);
    }

    @Post('update-profile')
    async updateProfile(@Body(UpdateUserValidationPipe) body: UpdateUserDTO, @Session() session: any) {
        await this.userService.update(session[SessionKeys.USER].id, body);
        return message('Updated profile.');
    }
}
