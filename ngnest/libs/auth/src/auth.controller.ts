import { RoleEntity } from './sub/entity/role.entity';
import { AuthGuard } from './auth.guard';
import { ClientSession, getClientSession, SessionType, setClientSession } from './session';
import { AuthEvents } from './auth-events.service';
import { BadRequestException, Body, CallHandler, Controller, Delete, ExecutionContext, Get, InternalServerErrorException, Logger, NestInterceptor, Param, ParseIntPipe, Post, Session, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import {
    CreateAuthUserDTO, LoginDTO,
    LoginValidationPipe, AuthUserEntity,
    CreateTeamMemberValidationPipe, SignupValidationPipe, SignupDTO
} from './sub';
import { Repository } from 'typeorm';
import { message, ToplainInterceptor as ToPlainInterceptor } from "@authdare/utils";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PublicResource } from './role/roles-meta-data.decorator';
import { map, Observable } from 'rxjs';
import { ClassTransformOptions } from 'class-transformer';
import { BGN } from '@authdare/objects';
import { ClientAdmin, RolesManager, SuperAdmin } from './role';
import { CreateTeamMemberDTO } from './sub/dto/create-team-member.dto';

const ClientUsersInterceptor = (options: ClassTransformOptions) => class TPI implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const session = getClientSession(context);
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
        @InjectRepository(AuthUserEntity) public readonly authUserRepository: Repository<AuthUserEntity>,
        @InjectRepository(RoleEntity) public readonly roleRepository: Repository<RoleEntity>,
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
    @Post(':orgname/login')
    async login(@Param('orgname') orgname: string, @Body(LoginValidationPipe) body: LoginDTO) {
        this.eventEmitter.emit(AuthEvents.LOGIN)
        return body;
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
    @Post('signup')
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
            const ___saved_auth_user = await this.authUserRepository.save(validatedInstance);

            // Emitting SIGNUP EVENT
            this.eventEmitter.emit(AuthEvents.SIGNUP, validatedInstance);

            // Creating User Session
            const userSession = new ClientSession({
                roles: validatedInstance.roles,
                email: validatedInstance.email,
                orgname: validatedInstance.orgname,
                visits: 1
            });

            // Setting User Session
            setClientSession(session, userSession)

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
    @Post("team")
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
        throw new BadRequestException("The member is already exist in your team")
    }

    @SuperAdmin()
    @Delete(":id")
    async deleteTeamMember(@Param("id", ParseIntPipe) id: number) {
        await this.authUserRepository.delete(id);
    }


    // @PublicResource()
    // @Get('roles')
    // async getRoles() {
    //     return await this.roleRepository.find()
    // }

}