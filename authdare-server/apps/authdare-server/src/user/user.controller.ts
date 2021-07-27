import { Delete, ParseBoolPipe, UseGuards } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ParseIntPipe, Post } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { QueryOptions } from '@authdare/common';
import { GetResourceService, ResourceService } from '@authdare/core';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiNotAcceptableResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto, User } from '@authdare/models';
import { AuthGuard } from '@authdare/guard';
import { Permission, Permissions } from '@authdare/auth';


const USER_RESOURCE_PATH = 'users';

@ApiTags(UserController.name)
@UseGuards(AuthGuard)
@Controller(USER_RESOURCE_PATH)
export class UserController {

    @Permissions(new Permission(USER_RESOURCE_PATH, 'READ'))
    @Get()
    @ApiNotAcceptableResponse()
    async find(
        @Query() queryOptions: QueryOptions<User>,
        @GetResourceService() resourceService: ResourceService,
    ) {
        return await resourceService.find(queryOptions);
    }

    @Permissions(new Permission(USER_RESOURCE_PATH, 'READ'))
    @Get(':id')
    @ApiNotAcceptableResponse()
    async findOneById(
        @Param("id", ParseIntPipe) id: number,
        @GetResourceService() resourceService: ResourceService,
    ) {
        return await resourceService.findOneById(id);
    }

    @Permissions(new Permission(USER_RESOURCE_PATH, 'READ'))
    @Post('query')
    @ApiNotAcceptableResponse()
    async query(
        @Body() queryOptions: QueryOptions<User>,
        @GetResourceService() resourceService: ResourceService,
    ) {
        return await resourceService.find(queryOptions);
    }

    @Permissions(new Permission(USER_RESOURCE_PATH, 'WRITE'))
    @Post()
    @ApiUnprocessableEntityResponse()
    async save(
        @Body() value: CreateUserDto,
        @GetResourceService() resourceService: ResourceService,
    ) {
        return await resourceService.save(value);
    }


    @Permissions(new Permission<User>(USER_RESOURCE_PATH, 'UPDATE', ['all']))
    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() value: UpdateUserDto,
        @GetResourceService() resourceService: ResourceService,
    ) {
        return await resourceService.update(id, value);
    }

    @Permissions(new Permission<User>(USER_RESOURCE_PATH, 'DELETE'))
    @Delete(':id/:hard')
    async delete(
        @Param('id', ParseIntPipe) id: number,
        @GetResourceService() resourceService: ResourceService,
        @Param('hard', ParseBoolPipe) hard?: boolean,
    ) {
        return await resourceService.delete(id, hard);
    }

}
