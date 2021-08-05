import { ResourceInterceptor } from './../resource.interceptor';

import { UpdateTaskDTO } from './dto/update-tast.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Controller, UseGuards, UseInterceptors } from "@nestjs/common";
import { Body, Delete, Get, Param, Patch, Post, Query, SetMetadata } from '@nestjs/common';
import { QueryDTO, QueryValidationPipe } from '@authdare/objects';
import { Repository } from 'typeorm';
import { TaskEntity } from './entity';
import { GetResourceRepo, ResourceEntity } from '../resource.decorator';
import { AuthGuard } from '@authdare/auth/auth.guard';
import { HasPermission, Permission } from '@authdare/auth/role';


@ResourceEntity(TaskEntity)
@UseInterceptors(ResourceInterceptor)
@UseGuards(AuthGuard)
@Controller('api/tasks')
export class TaskController {

    // @HasPermission([new Permission({ method: 'get', resource: 'users' })])
    @Get()
    async find(@Query(QueryValidationPipe) query: QueryDTO, @GetResourceRepo() repo: Repository<TaskEntity>) {
        const { errors, validatedInstance } = await new CreateTaskDTO(query as any).transformAndValidate()
        console.log(query, validatedInstance);
        return await repo.find({ ...(query as any), where: errors ? {} : validatedInstance });
    }

    // @HasPermission([new Permission({ method: 'get', resource: 'users' })])
    @Get(':id')
    async fingById(@Param('id') id: number, @GetResourceRepo() repo: Repository<TaskEntity>) {
        return await repo.findOne(id);
    }

    // @HasPermission([new Permission({ method: 'get', resource: 'users' })])
    @Post('query')
    async query(@Body() query: QueryDTO, @GetResourceRepo() repo: Repository<TaskEntity>) {
        const { errors, validatedInstance } = await new CreateTaskDTO(query as any).transformAndValidate()
        return await repo.find({ ...(query as any), where: errors ? {} : validatedInstance });
    }

    // @HasPermission([new Permission({ method: 'get', resource: 'users' })])
    @Post()
    async create(@Body() body: CreateTaskDTO, @GetResourceRepo() repo: Repository<TaskEntity>) {
        return await repo.save(body);
    }

    // @HasPermission([new Permission({ method: 'get', resource: 'users' })])
    @Patch(':id')
    async update(@Param('id') id: number, @Body() body: UpdateTaskDTO, @GetResourceRepo() repo: Repository<TaskEntity>) {
        return await repo.update(id, body);
    }

    // @HasPermission([new Permission({ method: 'get', resource: 'users' })])
    @Delete(':id/:hard')
    async delete(@Param('id') id: number, @Param('hard') hard: boolean, @GetResourceRepo() repo: Repository<TaskEntity>) {
        if (hard == true)
            return await repo.delete(id);
        return await repo.softDelete(id);
    }
}