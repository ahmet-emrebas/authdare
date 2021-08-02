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
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { BaseEntity } from '@authdare/models';
import { GetResourceService } from '@authdare/decorators';

/**
 * Just for making swagger happy
 */
class BodyClass {
  @ApiProperty() none?: string;
  [key: string]: any;
}

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
    @Body() body: BodyClass,
    @GetResourceService() service: ResourceService<T>,
    @Param('resource') resource?: string,
  ) {
    return await service.create(body as any);
  }

  @Patch(':id')
  async patch(
    @Param('id') id: number,
    @Body() body: BodyClass,
    @GetResourceService() service: ResourceService<T>,
    @Param('resource') resource?: string,
  ) {
    return await service.update(id, body as any);
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



@ApiTags('Resource')
export class CustomResourceController<T extends BaseEntity<any>> {
  constructor(private service: ResourceService<T>) { }

  @Get()
  async get(@Query() query: any) {
    return await this.service.find(query);
  }

  @Get(':id')
  async getByID(@Param('id') id: number, @Query() query: any) {
    return await this.service.find();
  }

  @Post()
  async post(@Body() body: BodyClass) {
    return await this.service.create(body as any);
  }

  @Patch(':id')
  async patch(@Param('id') id: number, @Body() body: BodyClass) {
    return await this.service.update(id, body as any);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.service.delete(id);
  }
}

