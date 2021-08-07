import { ForgotPasswordService } from './services/forgot-password.service';
import { UserService } from './services/user.service';
import { UpdateUserValidationPipe } from './user/dto/update-user.dto';
import { SignupService } from './services/signup.service';
import { AuthGuard } from './guards/auth.guard';
import { Body, Controller, Get, Logger, Post, Session, UseGuards, BadRequestException, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
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
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoginService } from './services/login.service';
import { PublicPolicy } from './decorators';
import { message } from '@authdare/utils';
import { SessionKeys } from './session-keys';
import { PermissionPolicy } from './decorators';
import { EmailEvents } from '.';

@ApiTags(AuthController.name)
@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(
        private readonly eventEmitter: EventEmitter2,
        private readonly loginService: LoginService,
        private readonly signupService: SignupService,
        private readonly forgotPasswordService: ForgotPasswordService,

        private readonly userService: UserService,
    ) {}

    @PermissionPolicy('get:tasks')
    @Get('profile')
    canRead(@Session() session: any) {
        const { orgname, email } = session[SessionKeys.USER];
        this.logger.log(session[SessionKeys.USER]);
        return this.userService.find({ where: { orgname, email } });
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

    @Post('forgot-password')
    async forgotPassword(@Body(ForgotPasswordValidationPipe) body: ForgotPasswordDTO) {
        return await this.forgotPasswordService.forgotPassword(body);
    }

    @Post('update-profile')
    async updateProfile(@Body(UpdateUserValidationPipe) body: UpdateUserDTO, @Session() session: any) {
        // console.log(body);
        // await this.authUserRepository.update(session.auth.id, body as any);
        // return message("Updated profile.");
    }
}
