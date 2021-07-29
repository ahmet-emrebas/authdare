import { plainToClass } from 'class-transformer';
import { pickBy } from 'lodash';
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, ParseIntPipe } from '@nestjs/common';
import { isNotEmpty, validate } from 'class-validator';
import { CreateTaskDTO, QueryTaskDTO, UpdateTaskDto } from './dto';
import { TaskService } from './task.service';

@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  create(@Body(ValidationPipe) createTaskDto: CreateTaskDTO) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  async findAll(@Query() query: QueryTaskDTO) {
    const wholeQuery = pickBy(plainToClass(QueryTaskDTO, query, { groups: ['query', 'field'], excludeExtraneousValues: true, exposeUnsetFields: false }), e => isNotEmpty(e));
    const errors = await validate(wholeQuery);


    const queryOptions = pickBy(plainToClass(QueryTaskDTO, query, { groups: ['query'], excludeExtraneousValues: true, exposeUnsetFields: false }), e => isNotEmpty(e));
    const whereOptions = pickBy(plainToClass(QueryTaskDTO, query, { groups: ['field'], excludeExtraneousValues: true, exposeUnsetFields: false }), e => isNotEmpty(e));

    console.log(queryOptions);
    console.log(whereOptions);

    if (errors && errors.length > 0) {
      return errors;
    }
    return await this.taskService.find({ ...queryOptions, where: whereOptions })
  }


  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.delete(id);
  }
}
