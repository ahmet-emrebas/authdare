import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { QueryOptions, ToQueryOptionsPipe } from '@authdare/base';
import { CreateUserDTO, UpdateUserDTO, UserEntity } from '@authdare/models';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("AuthdareUserController")
@Controller('authdare/users')
export class UserController {
    static readonly className = 'UserController';
    constructor(protected readonly userService: UserService) { }

    @Get()
    async find(@Query(ToQueryOptionsPipe) query: QueryOptions<UserEntity>,) {
        return await this.userService.find(query)
    }

    @Get(":id")
    async fingById(@Param("id") id: number,) {
        return await this.userService.findByIds(id);
    }

    @Post('query')
    async query(@Body() queryOptions: QueryOptions<UserEntity>,) {
        return await this.userService.find(queryOptions);
    }

    @Post()
    async create(@Body() body: CreateUserDTO) {
        return await this.userService.create(body);
    }

    @Patch(":id")
    async update(
        @Param("id") id: number, @Body() body: UpdateUserDTO) {
        return await this.userService.update(id, body);
    }

    @Delete(":id/:hard")
    async delete(
        @Param("id") id: number, @Param("hard") hard: boolean,) {
        if (hard == true)
            return await this.userService.deleteHard(id);
        return await this.userService.softDelete(id);
    }

}