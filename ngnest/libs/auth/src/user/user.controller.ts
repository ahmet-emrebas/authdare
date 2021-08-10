import { classToPlain, classToClass } from 'class-transformer';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Controller, Logger, Res, UseGuards } from '@nestjs/common';
import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard, ResourceType, ResourceTypeTokens } from '@authdare/auth';

import { FindManyUsersOptions, QueryUserDTO } from './dto/query-user.dto';
import { UpdateUserDTO, CreateUserDTO } from './dto';
import { UserService } from './user.service';

@ApiTags(UserController.name)
@UseGuards(AuthGuard)
@ResourceType(ResourceTypeTokens.DATA)
@Controller('api/users')
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private readonly userService: UserService) {}

    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Get()
    async find(@Query() query: FindManyUsersOptions, @Res() res: Response) {
        const findManyOptions = classToPlain(new FindManyUsersOptions(query), {
            excludeExtraneousValues: true,
            exposeUnsetFields: false,
        });
        const where = classToClass(new QueryUserDTO(query as any), {
            excludeExtraneousValues: true,
            exposeUnsetFields: false,
        });

        const founds = await this.userService.find({
            ...findManyOptions,
            where,
        });

        res.status(200);
        res.send(founds);
    }

    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Get(':id')
    async findOneById(@Param('id') id: number, @Res() res: Response) {
        const founds = await this.userService.findOneById(id);
        res.status(200);
        res.send(founds);
    }

    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Post('query')
    async query(@Body() query: FindManyUsersOptions, @Res() res: Response) {
        const findManyOptions = classToPlain(new FindManyUsersOptions(query), {
            excludeExtraneousValues: true,
            exposeUnsetFields: false,
        });

        const where = classToClass(new QueryUserDTO(query as any), {
            excludeExtraneousValues: true,
            exposeUnsetFields: false,
        });

        const founds = await this.userService.find({
            ...findManyOptions,
            where,
        });
        if (founds) {
            res.status(200);
            res.send(founds);
        }
    }

    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @ApiCreatedResponse()
    @Post()
    async create(@Body() body: CreateUserDTO, @Res() res: Response) {
        const created = await this.userService.create(body);
        res.status(201);
        res.send(created);
    }

    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @ApiCreatedResponse()
    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() body: UpdateUserDTO,
        @Res() res: Response,
    ) {
        const updated = await this.userService.update(id, body);
        res.status(201);
        res.send(updated);
    }

    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @ApiNoContentResponse()
    @Delete(':id')
    async delete(@Param('id') id: number, @Res() res: Response) {
        const deleted = await this.userService.softDelete(id);
        res.status(204);
        res.send(deleted);
    }

    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @ApiNoContentResponse()
    @Delete(':id/hard')
    async deleteHard(@Param('id') id: number, @Res() res: Response) {
        const deleted = await this.userService.delete(id);
        res.status(204);
        res.send(deleted);
    }
}
