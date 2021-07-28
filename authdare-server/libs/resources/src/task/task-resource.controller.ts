import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  Query,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  GetResourceService,
  InjectResourceInterceptor,
  BaseResourceService,
  QueryOptions,
  ToQueryOptionsPipe,
} from '@authdare/base';
import { AuthGuard, UserActiveStatusInterceptor } from '@authdare/auth';
import { CreateTaskDTO, UpdateTaskDTO, TaskEntity } from '@authdare/models';


@ApiTags('Client' + TaskResourceController.name)
@UseGuards(AuthGuard)
@UseInterceptors(InjectResourceInterceptor, UserActiveStatusInterceptor)
@Controller('tasks')
export class TaskResourceController {
  static readonly className = 'TaskResourceController';
  static readonly path = 'tasks';
  @Get()
  async find(
    @Query(ToQueryOptionsPipe) query: QueryOptions<TaskEntity>,
    @GetResourceService()
    resourceService: BaseResourceService<
      TaskEntity,
      CreateTaskDTO,
      UpdateTaskDTO
    >,
  ) {
    return await resourceService.find(query);
  }

  @Get(':id')
  async fingById(
    @Param('id') id: number,
    @GetResourceService()
    resourceService: BaseResourceService<
      TaskEntity,
      CreateTaskDTO,
      UpdateTaskDTO
    >,
  ) {
    return await resourceService.findByIds(id);
  }

  @Post('query')
  async query(
    @Body() queryOptions: QueryOptions<TaskEntity>,
    @GetResourceService()
    resourceService: BaseResourceService<
      TaskEntity,
      CreateTaskDTO,
      UpdateTaskDTO
    >,
  ) {
    return await resourceService.find(queryOptions);
  }

  @Post()
  async create(
    @Body() body: CreateTaskDTO,
    @GetResourceService()
    resourceService: BaseResourceService<
      TaskEntity,
      CreateTaskDTO,
      UpdateTaskDTO
    >,
  ) {
    return await resourceService.create(body);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateTaskDTO,
    @GetResourceService()
    resourceService: BaseResourceService<
      TaskEntity,
      CreateTaskDTO,
      UpdateTaskDTO
    >,
  ) {
    return await resourceService.update(id, body);
  }

  @Delete(':id/:hard')
  async delete(
    @Param('id') id: number,
    @Param('hard') hard: boolean,
    @GetResourceService()
    resourceService: BaseResourceService<
      TaskEntity,
      CreateTaskDTO,
      UpdateTaskDTO
    >,
  ) {
    if (hard == true) return await resourceService.deleteHard(id);
    return await resourceService.softDelete(id);
  }
}
