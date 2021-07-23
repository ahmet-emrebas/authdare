import { Post, Body, Get, Patch, Delete, Param, Query } from "@nestjs/common";
import { FindManyOptions } from 'typeorm'
import { BaseResourceService } from "./base.resource-service";
import { AuthUser } from '@authdare/core'
import { GetAuthUser } from '@authdare/common'


class EmptyDtoClass { }

/**
 * Each Client will have their own database. 
 */
export class BasicBaseController {
    constructor(private readonly resourceService: BaseResourceService) { }

    @Post()
    async create(@Body() creaetDto: EmptyDtoClass, @GetAuthUser() authUser: AuthUser) {
        return await this.resourceService.save(creaetDto);
    }

    @Get()
    async findAll(@Query() query: FindManyOptions, @GetAuthUser() authUser: AuthUser) {
        return await this.resourceService.find(query);
    }

    @Post('query')
    async findAllQuery(@Body() query: FindManyOptions, @GetAuthUser() authUser: AuthUser) {
        return await this.resourceService.find(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @GetAuthUser() authUser: AuthUser) {
        return await this.resourceService.find({ where: { id } });
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateDto: EmptyDtoClass, @GetAuthUser() authUser: AuthUser) {
        return await this.resourceService.update(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @GetAuthUser() authUser: AuthUser) {
        return await this.resourceService.delete(id);
    }
}