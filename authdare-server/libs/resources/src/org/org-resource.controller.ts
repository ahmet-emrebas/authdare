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
import { CreateOrgDTO, UpdateOrgDTO, OrgEntity } from '@authdare/models';


@ApiTags('Client' + OrgResourceController.name)
@UseGuards(AuthGuard)
@UseInterceptors(InjectResourceInterceptor, UserActiveStatusInterceptor)
@Controller('orgs')
export class OrgResourceController {
  static readonly className = 'OrgResourceController';
  static readonly path = 'orgs';
  @Get()
  async find(
    @Query(ToQueryOptionsPipe) query: QueryOptions<OrgEntity>,
    @GetResourceService()
    resourceService: BaseResourceService<
      OrgEntity,
      CreateOrgDTO,
      UpdateOrgDTO
    >,
  ) {
    return await resourceService.find(query);
  }

  @Get(':id')
  async fingById(
    @Param('id') id: number,
    @GetResourceService()
    resourceService: BaseResourceService<
      OrgEntity,
      CreateOrgDTO,
      UpdateOrgDTO
    >,
  ) {
    return await resourceService.findByIds(id);
  }

  @Post('query')
  async query(
    @Body() queryOptions: QueryOptions<OrgEntity>,
    @GetResourceService()
    resourceService: BaseResourceService<
      OrgEntity,
      CreateOrgDTO,
      UpdateOrgDTO
    >,
  ) {
    return await resourceService.find(queryOptions);
  }

  @Post()
  async create(
    @Body() body: CreateOrgDTO,
    @GetResourceService()
    resourceService: BaseResourceService<
      OrgEntity,
      CreateOrgDTO,
      UpdateOrgDTO
    >,
  ) {
    return await resourceService.create(body);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateOrgDTO,
    @GetResourceService()
    resourceService: BaseResourceService<
      OrgEntity,
      CreateOrgDTO,
      UpdateOrgDTO
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
      OrgEntity,
      CreateOrgDTO,
      UpdateOrgDTO
    >,
  ) {
    if (hard == true) return await resourceService.deleteHard(id);
    return await resourceService.softDelete(id);
  }
}
