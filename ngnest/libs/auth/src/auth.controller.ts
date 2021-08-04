import { RolesManager } from './roles-manager';
import { Permission, Role } from './sub/dto/role-permission.dto';
import { ClientSession, SessionType, setClientSession } from './session';
import { AuthEvents } from './auth-events.service';
import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Session } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateSubDTO, LoginDTO, LoginValidationPipe, SubEntity, SubCreateTeamValidation, SubSignupValidationPipe } from './sub';
import { Repository } from 'typeorm';
import { message } from "@authdare/utils";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { classToClass } from 'class-transformer';

@ApiTags(AuthController.name)
@Controller('auth')
export class AuthController {

    constructor(private eventEmitter: EventEmitter2, @InjectRepository(SubEntity) public readonly subRepository: Repository<SubEntity>) { }

    @Get('users')
    async getUsers(@Session() session: SessionType) {

        const requiredRole = RolesManager.superAdmin();
        const hasRole = RolesManager.hasRole(requiredRole, session.auth.roles);

        const requiredPermission = RolesManager.clientAdmin().permissions[0];
        const hasPermission = RolesManager.hasPermission(requiredPermission, session.auth.roles)
        console.log('has permissino ', hasPermission);
        console.log('has role ', hasRole);
        return;
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
            await this.subRepository.findOneOrFail({ where: [{ orgname: body.orgname }, { email: body.email }] })
        } catch (err) {
            const savedUser = await this.subRepository.save(body);
            this.eventEmitter.emit(AuthEvents.SIGNUP, savedUser);
            setClientSession(session, new ClientSession({ roles: body.roles, email: body.email, orgname: body.orgname, visits: 1 }))
            return message('Welcome!')
        }

        throw new BadRequestException("Account already exist")
    }

    @Post("team")
    createTeamMember(@Body(SubCreateTeamValidation) body: CreateSubDTO) { //
        return body;
    }

    @Delete(":id")
    async deleteTeamMember(@Param("id", ParseIntPipe) id: number) {
        await this.subRepository.delete(id);
    }

}