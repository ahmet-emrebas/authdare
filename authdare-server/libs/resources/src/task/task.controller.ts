import { resourcePath } from '@authdare/base/controller';
import { permissionString, SetPermission } from '@authdare/base/decorator';
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTaskDTO, QueryTaskDTO, TransformAndValidateQueryTaskPipe, UpdateTaskDto, TransformAndValidateCreateTaskPipe } from './dto';
import { TaskService } from './task.service';

const RESOURCE_PATH = 'tasks';


@ApiTags(TaskController.name)
@Controller(resourcePath(RESOURCE_PATH))
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @SetPermission(permissionString('post', RESOURCE_PATH))
  @Post()
  async create(@Body(TransformAndValidateCreateTaskPipe) createTaskDto: CreateTaskDTO) {
    return await this.taskService.create(createTaskDto);
  }

  @SetPermission(permissionString('get', RESOURCE_PATH))
  @Get()
  async findAll(@Query(TransformAndValidateQueryTaskPipe) query: QueryTaskDTO) {
    console.log(query);
    return await this.taskService.find(query)
  }

  @SetPermission(permissionString('get', RESOURCE_PATH))
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.findOne(id);
  }

  @SetPermission(permissionString('update', RESOURCE_PATH))
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @SetPermission(permissionString('delete', RESOURCE_PATH))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.softDelete(id);
  }


}
