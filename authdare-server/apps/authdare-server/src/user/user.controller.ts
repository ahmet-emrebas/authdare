import { Delete, ParseBoolPipe } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ParseIntPipe, Post } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { QueryOptions } from '@authdare/common';
import { GetResourceService, ResourceService } from '@authdare/core';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiNotAcceptableResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto, User } from '@authdare/models';

@ApiTags(UserController.name)
@Controller('users')
export class UserController {
    @Get()
    @ApiNotAcceptableResponse()
    async find(
        @Query() queryOptions: QueryOptions<User>,
        @GetResourceService() resourceService: ResourceService,
    ) {
        return await resourceService.find(queryOptions);
    }

    @Get(':id')
    @ApiNotAcceptableResponse()
    async findOneById(
        @Param(ParseIntPipe) id: number,
        @GetResourceService() resourceService: ResourceService,
    ) {
        return await resourceService.findOneById(id);
    }

    @Post('query')
    @ApiNotAcceptableResponse()
    async query(
        @Body() queryOptions: QueryOptions<User>,
        @GetResourceService() resourceService: ResourceService,
    ) {
        return await resourceService.find(queryOptions);
    }

    @Post()
    @ApiUnprocessableEntityResponse()
    async save(
        @Body() value: CreateUserDto,
        @GetResourceService() resourceService: ResourceService,
    ) {
        return await resourceService.save(value);
    }

    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() value: UpdateUserDto,
        @GetResourceService() resourceService: ResourceService,
    ) {
        return await resourceService.update(id, value);
    }

    @Delete(':id/:hard')
    async delete(
        @Param('id') id: number,
        @GetResourceService() resourceService: ResourceService,
        @Param('hard', ParseBoolPipe) hard?: boolean,
    ) {
        return await resourceService.delete(id, hard);
    }

}
