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
import { BaseEntity } from '@authdare/models';
import { GetResourceService } from '@authdare/decorators';

export const RESOURCE = 'resource';
export const ID_PARAM = 'id';
const ID_PATH = ':id';


@ApiTags('Resources')
export class ResourceController<T extends BaseEntity<any>> {

  @Get()
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async get(@Query() query: any, @GetResourceService() service: ResourceService<T>,
    @Param(RESOURCE) resource?: string,) {
    return await service.find(query);
  }

  @Get(ID_PATH)
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async getByID(
    @Param(ID_PARAM) id: number,
    @Query() query: any,
    @GetResourceService() service: ResourceService<T>,
    @Param(RESOURCE) resource?: string,
  ) {
    return await service.find();
  }

  @Post()
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async post(
    @Body() body: any,
    @GetResourceService() service: ResourceService<T>,
    @Param(RESOURCE) resource?: string,
  ) {
    return await service.create(body as any);
  }

  @Patch(ID_PATH)
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async patch(
    @Param(ID_PARAM) id: number,
    @Body() body: any,
    @GetResourceService() service: ResourceService<T>,
    @Param(RESOURCE) resource?: string,
  ) {
    return await service.update(id, body as any);
  }

  @Delete(ID_PATH)
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async delete(
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
  async get(@Query() query: any) {
    return await this.service.find(query);
  }

  @Get(ID_PATH)
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async getByID(@Param(ID_PARAM) id: number, @Query() query: any) {
    return await this.service.find();
  }

  @Post()
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async post(@Body() body: any) {
    return await this.service.create(body as any);
  }

  @Patch(ID_PATH)
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async patch(@Param(ID_PARAM) id: number, @Body() body: any) {
    return await this.service.update(id, body as any);
  }

  @Delete(ID_PATH)
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async delete(@Param(ID_PARAM) id: number) {
    return await this.service.delete(id);
  }
}

