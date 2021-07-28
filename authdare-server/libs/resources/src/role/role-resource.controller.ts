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
import { CreateRoleDTO, UpdateRoleDTO, RoleEntity } from '@authdare/models';


@ApiTags('Client' + RoleResourceController.name)
@UseGuards(AuthGuard)
@UseInterceptors(InjectResourceInterceptor, UserActiveStatusInterceptor)
@Controller('roles')
export class RoleResourceController {
  static readonly className = 'RoleResourceController';
  static readonly path = 'roles';
  @Get()
  async find(
    @Query(ToQueryOptionsPipe) query: QueryOptions<RoleEntity>,
    @GetResourceService()
    resourceService: BaseResourceService<
      RoleEntity,
      CreateRoleDTO,
      UpdateRoleDTO
    >,
  ) {
    return await resourceService.find(query);
  }

  @Get(':id')
  async fingById(
    @Param('id') id: number,
    @GetResourceService()
    resourceService: BaseResourceService<
      RoleEntity,
      CreateRoleDTO,
      UpdateRoleDTO
    >,
  ) {
    return await resourceService.findByIds(id);
  }

  @Post('query')
  async query(
    @Body() queryOptions: QueryOptions<RoleEntity>,
    @GetResourceService()
    resourceService: BaseResourceService<
      RoleEntity,
      CreateRoleDTO,
      UpdateRoleDTO
    >,
  ) {
    return await resourceService.find(queryOptions);
  }

  @Post()
  async create(
    @Body() body: CreateRoleDTO,
    @GetResourceService()
    resourceService: BaseResourceService<
      RoleEntity,
      CreateRoleDTO,
      UpdateRoleDTO
    >,
  ) {
    return await resourceService.create(body);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateRoleDTO,
    @GetResourceService()
    resourceService: BaseResourceService<
      RoleEntity,
      CreateRoleDTO,
      UpdateRoleDTO
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
      RoleEntity,
      CreateRoleDTO,
      UpdateRoleDTO
    >,
  ) {
    if (hard == true) return await resourceService.deleteHard(id);
    return await resourceService.softDelete(id);
  }
}
