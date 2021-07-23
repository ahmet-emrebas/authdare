import { DatabaseConfig } from '@authdare/config';
import { Post, Body, Get, Patch, Delete, Param, Query } from "@nestjs/common";
import { FindManyOptions } from 'typeorm'
import { BaseResourceService } from "./base.resource-service";
import { Constructor, AuthUser } from '@authdare/core'
import { GetAuthUser } from '@authdare/common'

import { getResourceService } from "../database.ts";

class EmptyDtoClass { }

/**
 * Each Client will have their own database. 
 */
export class BaseController {
    constructor(private readonly entity: Constructor, private readonly createDto: Constructor, private readonly updateDto: Constructor) { }

    private async resourceService(user: AuthUser): Promise<BaseResourceService> {
        return await getResourceService({ ...DatabaseConfig, name: user.orgname, entities: [this.entity], database: user.orgname as string, username: user.username, password: user.password } as any, this.entity, this.createDto, this.updateDto)
    }

    @Post()
    async create(@Body() creaetDto: EmptyDtoClass, @GetAuthUser() authUser: AuthUser) {
        return await (await this.resourceService(authUser)).save(creaetDto);
    }

    @Get()
    async findAll(@Query() query: FindManyOptions, @GetAuthUser() authUser: AuthUser) {
        return await (await this.resourceService(authUser)).find(query);
    }

    @Post('query')
    async findAllQuery(@Body() query: FindManyOptions, @GetAuthUser() authUser: AuthUser) {
        return await (await this.resourceService(authUser)).find(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @GetAuthUser() authUser: AuthUser) {
        return await (await this.resourceService(authUser)).find({ where: { id } });
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateDto: EmptyDtoClass, @GetAuthUser() authUser: AuthUser) {
        return await (await this.resourceService(authUser)).update(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @GetAuthUser() authUser: AuthUser) {
        return await (await this.resourceService(authUser)).delete(id);
    }
}