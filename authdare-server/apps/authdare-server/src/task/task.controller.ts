import { ToQueryOptionsPipe } from './../../../../libs/base/src/to-query-options.pipe';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { QueryOptions } from '@authdare/base';
import { Controller, Get, Query, Param, Body, Post, Patch, Delete } from '@nestjs/common';
import { TaskEntity } from './entity/task.entity';
import { TaskService } from './task.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(TaskController.name)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }
  @Get()
  async find(@Query(ToQueryOptionsPipe) query: QueryOptions<TaskEntity>) {
    return await this.taskService.find(query);
  }

  @Get(":id")
  async fingById(@Param("id") id: number) {
    return await this.taskService.findByIds(id);
  }

  @Post('query')
  async query(@Body() queryOptions: QueryOptions<TaskEntity>) {
    return await this.taskService.find(queryOptions);
  }

  @Post()
  async create(@Body() body: CreateTaskDTO) {
    return await this.taskService.create(body);
  }


  @Patch(":id")
  async update(@Param("id") id: number, @Body() body: UpdateTaskDTO,) {
    return await this.taskService.update(id, body);
  }


  @Delete(":id/:hard")
  async delete(@Param("id") id: number, @Param("hard") hard: boolean) {
    if (hard == true)
      return await this.taskService.delete(id);

    return await this.taskService.softDelete(id);
  }
}
