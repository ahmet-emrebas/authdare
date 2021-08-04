import { AuthGuard } from './auth.guard';
import { RolesManager } from './role/roles-manager';
import { ClientSession, SessionType, setClientSession } from './session';
import { AuthEvents } from './auth-events.service';
import { BadRequestException, Body, Controller, Delete, Get, NotImplementedException, Param, ParseIntPipe, Post, Session, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateSubDTO, LoginDTO, LoginValidationPipe, SubEntity, SubCreateTeamValidation, SubSignupValidationPipe } from './sub';
import { Repository } from 'typeorm';
import { message } from "@authdare/utils";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { HasRole } from './role/set-roles.decorator';

@ApiTags(AuthController.name)
@Controller('auth')
export class AuthController {

    constructor(private eventEmitter: EventEmitter2, @InjectRepository(SubEntity) public readonly subRepository: Repository<SubEntity>) { }

    @Get('users')
    @UseGuards(AuthGuard)
    @HasRole([RolesManager.clientAdmin()])
    async getUsers() {
        return await this.subRepository.find()
    }

    @Post('login')
    login(@Body(LoginValidationPipe) body: LoginDTO) {
        this.eventEmitter.emit(AuthEvents.LOGIN)
        return body;
    }

    @ApiCreatedResponse({ description: "When account created" })
    @ApiBadRequestResponse({ description: "When account already exist or input validation error." })
    @ApiInternalServerErrorResponse({ description: "When cound not connect database or (?)" })
    @Post('signup')
    async signup(@Body(SubSignupValidationPipe) body: CreateSubDTO, @Session() session: SessionType) {

        try {
            // Try to find the user with orgname and email. If user exists, then skip the CATCH BLOCK, and throw BadRequestException
            await this.subRepository.findOneOrFail({ where: [{ orgname: body.orgname }, { email: body.email }] })
        } catch (err) {
            const savedUser = await this.subRepository.save(body);

            // Emitting SIGNUP EVENT
            this.eventEmitter.emit(AuthEvents.SIGNUP, savedUser);

            // Creating User Session
            const userSession = new ClientSession({ roles: body.roles, email: body.email, orgname: body.orgname, visits: 1 });

            // Setting User Session
            setClientSession(session, userSession)

            // Send greeting message or redirect user to the application dashboard.
            return message('Welcome!')
        }

        throw new BadRequestException("Account already exist")
    }

    @HasRole([RolesManager.clientAdmin()])
    @Post("team")
    createTeamMember(@Body(SubCreateTeamValidation) body: CreateSubDTO, @Session() session: SessionType) {
        throw new Error("Not implemented");
    }

    @Delete(":id")
    async deleteTeamMember(@Param("id", ParseIntPipe) id: number) {
        await this.subRepository.delete(id);
    }

}