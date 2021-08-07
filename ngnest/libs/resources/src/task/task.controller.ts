import { classToPlain } from 'class-transformer';
import { QueryTaskPipe, FindManyTasksOptions } from './dto/query-task.dto';
import { UpdateTaskDTO, CreateTaskDTO } from './dto';
import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { TaskService } from './task.service';
import { rest } from 'lodash';

@Controller('api/tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}
    @Get()
    async find(@Query(QueryTaskPipe) query: FindManyTasksOptions) {
        console.log(query);
        const where = classToPlain(query.where);
        const q = { ...query, where };
        console.log(q);
        return await this.taskService.find(q);
    }

    @Get(':id')
    async findOneById(@Param('id') id: number) {
        return await this.taskService.findOneById(id);
    }

    @Post('query')
    async query(@Body() query: FindManyOptions) {
        return await this.taskService.find(query);
    }

    @Post()
    async create(@Body() body: CreateTaskDTO) {
        return await this.taskService.create(body);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() body: UpdateTaskDTO) {
        return await this.taskService.update(id, body);
    }

    @Delete(':id')
    async delete(@Param('id') id: number, @Param('hard') hard: boolean) {
        return await this.taskService.softDelete(id);
    }
    @Delete(':id/hard')
    async deleteHard(@Param('id') id: number, @Param('hard') hard: boolean) {
        return await this.taskService.delete(id);
    }
}
