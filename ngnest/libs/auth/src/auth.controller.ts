import { AuthEvents } from './auth-events.service';
import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Session } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateSubDTO, LoginDTO, LoginValidationPipe, SubEntity, SubCreateTeamValidation, SubSignupValidationPipe, SubPermissionDTO, RoleManager, Role } from './sub';
import { Repository } from 'typeorm';
import { message } from "@authdare/utils";
import { EventEmitter2 } from "@nestjs/event-emitter";


const f0 = new SubPermissionDTO({ method: "get", resource: "resoue" })
const f1 = new SubPermissionDTO({ method: "post", resource: "resources" })

const r1 = new Role({ name: 'admin', permissions: { 0: f0, 1: f0 } })
const r2 = new Role({ name: 'admin', permissions: { 0: f0, 1: f1 } })

console.log("has value in : ", r1.hazin('name', f1));


@ApiTags(AuthController.name)
@Controller('auth')
export class AuthController {

    constructor(
        private eventEmitter: EventEmitter2,
        @InjectRepository(SubEntity) public readonly subRepository: Repository<SubEntity>
    ) { }

    @Get('users')
    async getUsers(@Session() s: any) {
        s.visits = s.visits ? s.visits + 1 : 1;
        return s;
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
    async signup(@Body(SubSignupValidationPipe,) body: CreateSubDTO) {
        try {
            await this.subRepository.findOneOrFail({ where: [{ orgname: body.orgname }, { email: body.email }] })
        } catch (err) {
            const savedUser = await this.subRepository.save(body);
            this.eventEmitter.emit(AuthEvents.SIGNUP, savedUser);
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