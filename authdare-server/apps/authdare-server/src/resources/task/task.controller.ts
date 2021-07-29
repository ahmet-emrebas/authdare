import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, ParseIntPipe } from '@nestjs/common';
import { CreateTaskDTO, QueryTaskDTO, TransformAndValidateQueryTaskDTO, UpdateTaskDto } from './dto';
import { TaskService } from './task.service';

@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  create(@Body(ValidationPipe) createTaskDto: CreateTaskDTO) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  async findAll(@Query(TransformAndValidateQueryTaskDTO) query: QueryTaskDTO) {
    return await this.taskService.find(query)
  }


  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Query(TransformAndValidateQueryTaskDTO) query: QueryTaskDTO) {
    return await this.taskService.findOne(id);
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
