import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto } from '@authdare/models';
import { Post, Body, Get, Patch, Delete, Param, Query, Controller } from "@nestjs/common";
import { FindManyOptions } from 'typeorm'
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';


@ApiTags('RoleController')
@Controller('roles')
export class RoleController {
    constructor(private roleService: RoleService) { }

    @ApiCreatedResponse()
    @ApiUnprocessableEntityResponse()
    @Post()
    async create(@Body() creaetDto: CreateRoleDto,) {
        return await this.roleService.save(creaetDto);
    }

    @ApiOkResponse()
    @Get()
    async findAll(@Query() query: FindManyOptions) {
        return await this.roleService.find(query);
    }

    @ApiOkResponse()
    @Post('query')
    async findAllQuery(@Body() query: FindManyOptions) {
        return await this.roleService.find(query);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.roleService.find({ where: { id } });
    }


    @ApiCreatedResponse()
    @ApiUnprocessableEntityResponse()
    @ApiNotFoundResponse()
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateDto: UpdateRoleDto) {
        return await this.roleService.update(id, updateDto);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.roleService.delete(id);
    }
}