import { AuthPaths } from './auth-paths';
import { AuthGuard } from './auth.guard';
import { ClientSession, getClientSession, SessionType, setClientSession } from './session';
import { AuthEvents } from './auth-database.service';
import { BadRequestException, Body, CallHandler, Controller, ExecutionContext, Get, InternalServerErrorException, Logger, NestInterceptor, Post, Session, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import {
    CreateAuthUserDTO, LoginDTO,
    LoginValidationPipe, AuthUserEntity,
    CreateTeamMemberValidationPipe, SignupValidationPipe, SignupDTO, ForgotPasswordDTO, ForgotPasswordValidationPipe, UpdateAuthUserDTO, UpdateAuthUserValidationPipe
} from './sub';
import { Repository } from 'typeorm';
import { message, ToplainInterceptor as ToPlainInterceptor } from "@authdare/utils";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { map, Observable, throttleTime } from 'rxjs';
import { ClassTransformOptions } from 'class-transformer';
import { BGN } from '@authdare/objects';
import { ClientAdmin, RolesManager, SuperAdmin } from './role';
import { CreateTeamMemberDTO } from './sub/dto/create-team-member.dto';
import { compare } from 'bcrypt';
import { PublicResource } from '@authdare/decorators/auth';

const ClientUsersInterceptor = (options: ClassTransformOptions) => class CUI implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const session = await getClientSession(context);
        const orgname = session.orgname;
        return next.handle().pipe(map((data: AuthUserEntity[]) => {
            return data.filter((e) => e.orgname && orgname && e.orgname == orgname)
        }))
    }
}



@ApiTags(AuthController.name)
@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {

    private readonly logger = new Logger(AuthController.name)

    constructor(
        private eventEmitter: EventEmitter2,
        @InjectRepository(AuthUserEntity) public readonly authUserRepository: Repository<AuthUserEntity>
    ) { }

    @ClientAdmin()
    @UseInterceptors(
        ToPlainInterceptor(),
        ClientUsersInterceptor({ groups: [...Object.values(BGN)] })
    )
    @Get('client/users')
    async getClientUsers() {
        return await this.authUserRepository.find()
    }

    @SuperAdmin()
    @UseInterceptors(ToPlainInterceptor())
    @Get('all/users')
    async getAllUsers() {
        return await this.authUserRepository.find()
    }

    @PublicResource()
    @Get('orgs')
    async getOrgs() {
        return (await this.authUserRepository.find({ select: ['orgname'] })).map(e => e.orgname)
    }

    @PublicResource()
    @Post('login')
    async login(@Body(LoginValidationPipe) body: LoginDTO, @Session() session: SessionType) {
        try {
            const foundUser = await this.authUserRepository.findOneOrFail({ email: body.email })

            const isPasswordMatch = await compare(body.password, foundUser.password);

            if (isPasswordMatch) {
                setClientSession(session, new ClientSession({
                    email: foundUser.email,
                    roles: foundUser.roles,
                    orgname: foundUser.orgname,
                    visits: 1,
                    id: foundUser.id
                }));
                return message('Welcome back!');
            } else {
                throw new BadRequestException('Password does not match!');
            }

        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException()
        }


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

    @PublicResource()
    @Post(AuthPaths.SIGNUP)
    async signup(@Body(SignupValidationPipe) ___body: SignupDTO, @Session() session: SessionType) {

        // Creating, transforming, and validating client admin user.
        const { errors, validatedInstance } =
            await new CreateAuthUserDTO({ ...___body, roles: [RolesManager.clientAdmin()] })
                .transformAndValidate()

        if (errors) {
            this.logger.error('Could not validate the user for some reason!', errors, validatedInstance);
            throw new InternalServerErrorException()
        }

        try {
            // Try to find the user with orgname and email. If user exists, then skip the CATCH BLOCK, and throw BadRequestException
            await this.authUserRepository.findOneOrFail({
                where: [
                    { orgname: validatedInstance.orgname },
                    { email: validatedInstance.email }
                ]
            })
        } catch (err) {
            const savedUser = await this.authUserRepository.save(validatedInstance);

            // Emitting SIGNUP EVENT
            this.eventEmitter.emit(AuthEvents.SIGNUP, validatedInstance);

            // Setting User Session
            setClientSession(session, new ClientSession({
                roles: validatedInstance.roles,
                email: validatedInstance.email,
                orgname: validatedInstance.orgname,
                visits: 1,
                id: savedUser.id
            }));

            // Send greeting message or redirect user to the application dashboard.
            return message('Welcome!')
        }

        throw new BadRequestException("Account already exist")
    }

    /**
     * Create a team member
     * @param body 
     * @param session 
     */
    @ClientAdmin()
    @Post(AuthPaths.CREATE_MEMBER)
    async createTeamMember(@Body(CreateTeamMemberValidationPipe) body: CreateTeamMemberDTO, @Session() session: SessionType) {


        const { errors, validatedInstance } = await new CreateAuthUserDTO({ ...body, orgname: session.auth.orgname }).transformAndValidate();

        if (errors) {
            this.logger.error('Could not validate the new member for some reason!', errors, validatedInstance);
            throw new InternalServerErrorException()
        }

        try {
            // Try to find the user with orgname and email. If user exists, then skip the CATCH BLOCK, and throw BadRequestException
            await this.authUserRepository.findOneOrFail({
                where: { email: validatedInstance.email }
            })
        } catch (err) {
            const __save_new_member = await this.authUserRepository.save(validatedInstance);

            // Emitting SIGNUP EVENT
            this.eventEmitter.emit(AuthEvents.CREATE_MEMBER, validatedInstance);
            return message('Member created!')
        }
        throw new BadRequestException("The member already exist in your team")
    }


    @PublicResource()
    @Post(AuthPaths.FORGOT_PASSWORD)
    async forgotPassword(@Body(ForgotPasswordValidationPipe) body: ForgotPasswordDTO) {

        try {
            const foundUser = await this.authUserRepository.findOneOrFail({ email: body.email })
            if (foundUser && foundUser.email && foundUser.email == body.email) {
                this.eventEmitter.emit(AuthEvents.FORGOT_PASSWORD, foundUser);
                return message("We sent a temporary password to your email.");
            }
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException("The acount does NOT exist!")
        }

        throw new BadRequestException("The acount does NOT exist!")
    }


    @Post(AuthPaths.UPDATE_PROFILE)
    async updateProfile(@Body(UpdateAuthUserValidationPipe) body: UpdateAuthUserDTO, @Session() session: SessionType) {
        console.log(body)
        await this.authUserRepository.update(session.auth.id, body);
        return message("Updated profile.");
    }



}