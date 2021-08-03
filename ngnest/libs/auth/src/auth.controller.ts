import { Body, CacheInterceptor, Controller, Get, Param, ParseIntPipe, Post, Res, UseFilters, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateSubDTO, LoginDTO, LoginValidationPipe, SubEntity, SubCreateTeamValidation, SubSignupValidationPipe, SubPermissionDTO } from './sub';
import { Repository } from 'typeorm';
import { message } from "@authdare/utils";

@ApiTags(AuthController.name)
@Controller('auth')
export class AuthController {

    constructor(@InjectRepository(SubEntity) private readonly subRepo: Repository<SubEntity>) { }

    @Get('users')
    async getUsers() {
        console.log('Is working ? ')
        return await this.subRepo.find();
    }

    @Post('login')
    login(@Body(LoginValidationPipe) body: LoginDTO) {

        return body;
    }

    @Post('signup')
    async signup(@Body(SubSignupValidationPipe) body: CreateSubDTO) {
        body.permissions = [];
        await this.subRepo.save(body);
        return message('Welcome!')
    }

    @Post("team")
    createTeamMember(@Body(SubCreateTeamValidation) body: CreateSubDTO) { //
        return body;
    }

    @Post(":id")
    async deleteTeamMember(@Param("id", ParseIntPipe) id: number) {
        await this.subRepo.delete(id);
    }

}