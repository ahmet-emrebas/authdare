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
import { ApiTags } from '@nestjs/swagger';
import { DeepPartial } from 'typeorm';
import { BaseEntity } from '@authdare/models';
import { GetResourceService } from '@authdare/decorators';

@ApiTags('Resource')
export class ResourceController<T extends BaseEntity<any>> {

  @Get()
  async get(
    @Query() query: any,
    @GetResourceService() service: ResourceService<T>,
    @Param('resource') resource?: string,
  ) {
    return await service.find(query);
  }

  @Get(':id')
  async getByID(
    @Param('id') id: number,
    @Query() query: any,
    @GetResourceService() service: ResourceService<T>,
    @Param('resource') resource?: string,
  ) {
    return await service.find();
  }

  @Post()
  async post(
    @Body() body: DeepPartial<T>,
    @GetResourceService() service: ResourceService<T>,
    @Param('resource') resource?: string,
  ) {
    return await service.create(body);
  }

  @Patch(':id')
  async patch(
    @Param('id') id: number,
    @Body() body: DeepPartial<T>,
    @GetResourceService() service: ResourceService<T>,
    @Param('resource') resource?: string,
  ) {
    return await service.update(id, body);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @GetResourceService() service: ResourceService<T>,
    @Param('resource') resource?: string,
  ) {
    return await service.delete(id);
  }
}
