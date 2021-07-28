import { RoleService } from './role.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { QueryOptions, ToQueryOptionsPipe } from '@authdare/base';
import { CreateRoleDTO, UpdateRoleDTO, RoleEntity } from '@authdare/models';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("AuthdareRoleController")
@Controller('authdare/roles')
export class RoleController {
    static readonly className = 'RoleController';
    constructor(protected readonly roleService: RoleService) { }

    @Get()
    async find(@Query(ToQueryOptionsPipe) query: QueryOptions<RoleEntity>,) {
        return await this.roleService.find(query)
    }

    @Get(":id")
    async fingById(@Param("id") id: number,) {
        return await this.roleService.findByIds(id);
    }

    @Post('query')
    async query(@Body() queryOptions: QueryOptions<RoleEntity>,) {
        return await this.roleService.find(queryOptions);
    }

    @Post()
    async create(@Body() body: CreateRoleDTO) {
        return await this.roleService.create(body);
    }

    @Patch(":id")
    async update(
        @Param("id") id: number, @Body() body: UpdateRoleDTO) {
        return await this.roleService.update(id, body);
    }

    @Delete(":id/:hard")
    async delete(
        @Param("id") id: number, @Param("hard") hard: boolean,) {
        if (hard == true)
            return await this.roleService.deleteHard(id);
        return await this.roleService.softDelete(id);
    }

}