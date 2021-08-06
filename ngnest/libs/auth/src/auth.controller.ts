import { SignupService } from './services/signup.service';
import { AuthGuard } from './auth.guard';
import { Body, Controller, Logger, Post, Session, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags } from "@nestjs/swagger";
import {
    LoginDTO,
    LoginValidationPipe, CreateTeamMemberValidationPipe, SignupValidationPipe, SignupDTO, ForgotPasswordDTO, ForgotPasswordValidationPipe, UpdateUserDTO, UpdateAuthUserValidationPipe
} from './sub';
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ClientAdmin } from './role';
import { CreateTeamMemberDTO } from './sub/dto/create-team-member.dto';
import { PublicPolicy } from '@authdare/decorators/auth';
import { LoginService } from './services/login.service';

@ApiTags(AuthController.name)
@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {

    private readonly logger = new Logger(AuthController.name)

    constructor(
        private eventEmitter: EventEmitter2,
        private loginService: LoginService,
        private signupService: SignupService
    ) { }


    @PublicPolicy()
    @Post('login')
    async login(@Body(LoginValidationPipe) body: LoginDTO, @Session() session: any) {
        const user = await this.loginService.login(body);

    }


    /**
     * Signup process
     * @param ___body 
     * @param session 
     * @returns 
     */
    @ApiCreatedResponse({ description: "When account created" })
    @ApiBadRequestResponse({ description: "When account already exist or input validation error." })
    @ApiInternalServerErrorResponse({ description: "When cound not connect database or (?)" })

    @PublicPolicy()
    @Post("signup")
    async signup(@Body(SignupValidationPipe) userdata: SignupDTO, @Session() session: any) {
    }

    /**
     * Create a team member
     * @param body 
     * @param session 
     */
    @ClientAdmin()
    @Post("create-member")
    async createTeamMember(@Body(CreateTeamMemberValidationPipe) body: CreateTeamMemberDTO, @Session() session: any) { }


    @PublicPolicy()
    @Post("forgot-password")
    async forgotPassword(@Body(ForgotPasswordValidationPipe) body: ForgotPasswordDTO) {

        // try {
        //     const foundUser = await this.authUserRepository.findOneOrFail({ email: body.email })
        //     if (foundUser && foundUser.email && foundUser.email == body.email) {
        //         this.eventEmitter.emit(AuthEvents.FORGOT_PASSWORD, foundUser);
        //         return message("We sent a temporary password to your email.");
        //     }
        // } catch (err) {
        //     this.logger.error(err);
        //     throw new BadRequestException("The acount does NOT exist!")
        // }

        // throw new BadRequestException("The acount does NOT exist!")
    }


    @Post("update-profile")
    async updateProfile(@Body(UpdateAuthUserValidationPipe) body: UpdateUserDTO, @Session() session: any) {
        // console.log(body);
        // await this.authUserRepository.update(session.auth.id, body as any);
        // return message("Updated profile.");
    }



}