import { SessionKeys } from './../../../auth/src/session-keys';
import {
    WriteFromOrgInterceptor,
    ReadFromOrgInterceptor,
} from './../org.interceptor';
import { classToPlain, classToClass } from 'class-transformer';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
    Controller,
    InternalServerErrorException,
    Logger,
    Res,
    Session,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard, ResourceType, ResourceTypeTokens } from '@authdare/auth';

import {
    FindManyTasksOptions,
    QueryTaskDTO,
    ValidateFindManyTaskOptionsPipe,
} from './dto/query-task.dto';
import { UpdateTaskDTO, CreateTaskDTO, CreateTaskDTOPipe } from './dto';
import { TaskService } from './task.service';
import { TaskEntity } from '.';
import { keys, pickBy } from 'lodash';

@ApiTags(TaskController.name)
@UseGuards(AuthGuard)
@ResourceType(ResourceTypeTokens.DATA)
@Controller('api/tasks')
export class TaskController {
    private readonly logger = new Logger(TaskController.name);
    constructor(private readonly taskService: TaskService) {}

    private orgname(session: any) {
        const orgname = session[SessionKeys.USER].orgname;
        if (!orgname) {
            this.logger.error(`Orgname not found!`);
            throw new InternalServerErrorException();
        }
        return orgname;
    }

    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Get()
    async find(
        @Query(ValidateFindManyTaskOptionsPipe) query: FindManyTasksOptions,
        @Res() res: Response,
        @Session() session: any,
    ) {
        const findManyOptions = classToPlain(new FindManyTasksOptions(query), {
            excludeExtraneousValues: true,

            exposeUnsetFields: false,
        });

        findManyOptions.select = findManyOptions.select?.filter((e: string) =>
            keys(TaskEntity).includes(e),
        );

        const where = classToClass(new QueryTaskDTO(query as any), {
            excludeExtraneousValues: true,
            exposeUnsetFields: false,
        });

        console.log(findManyOptions);
        console.log(where);

        const founds = await this.taskService.find({
            ...pickBy(findManyOptions, (e) => !!e),
            where: pickBy(where, (e) => !!e),
        });

        const orgname = this.orgname(session);
        res.status(200);
        res.send(founds.filter((e) => e.orgname == orgname));
    }

    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Get(':id')
    async findOneById(
        @Param('id') id: number,
        @Res() res: Response,
        @Session() session: any,
    ) {
        const founds = await this.taskService.findOneById(id);

        const orgname = this.orgname(session);
        if (founds?.orgname == orgname) {
            res.status(200);
            res.send(founds);
            return;
        }

        return {};
    }

    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Post('query')
    async query(
        @Body(ValidateFindManyTaskOptionsPipe) query: FindManyTasksOptions,
        @Res() res: Response,
        @Session() session: any,
    ) {
        return this.find(query, res, session);
    }

    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @ApiCreatedResponse()
    @Post()
    async create(
        @Body(CreateTaskDTOPipe) body: CreateTaskDTO,
        @Res() res: Response,
        @Session() session: any,
    ) {
        const withOrg = { ...body, orgname: this.orgname(session) };
        const created = await this.taskService.create(withOrg);

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
