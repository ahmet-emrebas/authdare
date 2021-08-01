import { ResourceService } from './resource.service';
import { AuthGuard } from './auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetResourceService } from './decorators';
import { DeepPartial } from 'typeorm';

@ApiTags('Resource')
@UseGuards(AuthGuard)
@Controller('api/:resource')
export class ResourceController<T extends object> {
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
    @Body() body: T,
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
