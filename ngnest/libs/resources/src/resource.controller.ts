import { ResourceService } from './resource.service';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { BaseEntity, QueryOptions } from '@authdare/models';
import { GetResourceService } from '@authdare/decorators';
import { FindManyOptions } from 'typeorm';

export const RESOURCE = 'resource';
export const ID_PARAM = 'id';
const ID_PATH = ':id';

class EmptyClass { }


@ApiTags('Resources')
export class ResourceController<T extends BaseEntity<any>> {

  @Get()
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async get(
    @Query() query: QueryOptions<T>,
    @GetResourceService() service: ResourceService<T>,
    @Param(RESOURCE) resource?: string
  ) {
    return await service.find(query);
  }

  @Get(ID_PATH)
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async getOne(
    @Param(ID_PARAM) id: number,
    @GetResourceService() service: ResourceService<T>,
    @Param(RESOURCE) resource?: string,
  ) {
    return await service.findById(id);
  }

  @Post('query')
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async query(
    @Body() query: FindManyOptions,
    @GetResourceService() service: ResourceService<T>,
    @Param(RESOURCE) resource?: string
  ) {
    return await service.query(query);
  }

  @Post()
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async post(
    @Body() body: EmptyClass,
    @GetResourceService() service: ResourceService<T>,
    @Param(RESOURCE) resource?: string,
  ) {
    return await service.create(body as any);
  }

  @Patch(ID_PATH)
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async patchOne(
    @Param(ID_PARAM) id: number,
    @Body() body: EmptyClass,
    @GetResourceService() service: ResourceService<T>,
    @Param(RESOURCE) resource?: string,
  ) {
    return await service.update(id, body as any);
  }

  @Delete(ID_PATH)
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async deleteOne(
    @Param(ID_PARAM) id: number,
    @GetResourceService() service: ResourceService<T>,
    @Param(RESOURCE) resource?: string,
  ) {
    return await service.delete(id);
  }
}


@ApiTags('Resource')
export class CustomResourceController<T extends BaseEntity<any>> {
  constructor(private service: ResourceService<T>) { }

  @Get()
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async get(@Query() query: QueryOptions<T>) {
    return await this.service.find(query);
  }

  @Get(ID_PATH)
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async getOne(@Param(ID_PARAM) id: number) {
    return await this.service.findById(id);
  }

  @Post('query')
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async query(
    @Body() query: FindManyOptions,
    @Param(RESOURCE) resource?: string
  ) {
    return await this.service.query(query);
  }


  @Post()
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async post(@Body() body: EmptyClass) {
    return await this.service.create(body as any);
  }

  @Patch(ID_PATH)
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async patchOne(@Param(ID_PARAM) id: number, @Body() body: EmptyClass) {
    return await this.service.update(id, body as any);
  }


  @Delete(ID_PATH)
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async deleteOne(@Param(ID_PARAM) id: number) {
    return await this.service.delete(id);
  }
}

