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

import { FindManyTasksOptions, QueryTaskDTO } from './dto/query-task.dto';
import { UpdateTaskDTO, CreateTaskDTO } from './dto';
import { TaskService } from './task.service';

@ApiTags(TaskController.name)
@UseGuards(AuthGuard)
@ResourceType(ResourceTypeTokens.DATA)
@Controller('api/tasks')
export class TaskController {
    private readonly logger = new Logger(TaskController.name);
    constructor(private readonly taskService: TaskService) {}

    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Get()
    async find(@Query() query: FindManyTasksOptions, @Res() res: Response) {
        const findManyOptions = classToPlain(new FindManyTasksOptions(query), {
            excludeExtraneousValues: true,
            exposeUnsetFields: false,
        });
        const where = classToClass(new QueryTaskDTO(query as any), {
            excludeExtraneousValues: true,
            exposeUnsetFields: false,
        });

        // console.log(where);
        // console.log(findManyOptions);
        const founds = await this.taskService.find({
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
        const founds = await this.taskService.findOneById(id);
        res.status(200);
        res.send(founds);
    }

    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Post('query')
    async query(@Body() query: FindManyTasksOptions, @Res() res: Response) {
        const findManyOptions = classToPlain(new FindManyTasksOptions(query), {
            excludeExtraneousValues: true,
            exposeUnsetFields: false,
        });

        const where = classToClass(new QueryTaskDTO(query as any), {
            excludeExtraneousValues: true,
            exposeUnsetFields: false,
        });

        const founds = await this.taskService.find({
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
    async create(@Body() body: CreateTaskDTO, @Res() res: Response) {
        const created = await this.taskService.create(body);
        res.status(201);
        res.send(created);
    }

    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @ApiCreatedResponse()
    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() body: UpdateTaskDTO,
        @Res() res: Response,
    ) {
        const updated = await this.taskService.update(id, body);
        res.status(201);
        res.send(updated);
    }

    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @ApiNoContentResponse()
    @Delete(':id')
    async delete(@Param('id') id: number, @Res() res: Response) {
        const deleted = await this.taskService.softDelete(id);
        res.status(204);
        res.send(deleted);
    }

    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @ApiNoContentResponse()
    @Delete(':id/hard')
    async deleteHard(@Param('id') id: number, @Res() res: Response) {
        const deleted = await this.taskService.delete(id);
        res.status(204);
        res.send(deleted);
    }
}
