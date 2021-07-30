import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTaskDTO, QueryTaskDTO, TransformAndValidateQueryTaskPipe, UpdateTaskDto, TransformAndValidateCreateTaskPipe } from './dto';
import { TaskService } from './task.service';

@ApiTags(TaskController.name)
@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  create(@Body(TransformAndValidateCreateTaskPipe) createTaskDto: CreateTaskDTO) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  async findAll(@Query(TransformAndValidateQueryTaskPipe) query: QueryTaskDTO) {
    return await this.taskService.find(query)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.softDelete(id);
  }


}
