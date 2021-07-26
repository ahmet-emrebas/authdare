import { ResourceService } from './resource.service';
import { QueryOptions } from '@authdare/common';
import {
  Get,
  NotAcceptableException,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Delete,
  ParseBoolPipe,
  Body,
  Query,
} from '@nestjs/common';
import {
  ApiNotAcceptableResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { GetResourceService } from './get-resource-service.decorator';

/**
 * You can either extend or implement this class for your Resouce controllers.
 */
export class ResourceController<Entity, CreateDTO, UpdateDTO> {
  @Get()
  @ApiNotAcceptableResponse()
  async find(
    @Query() queryOptions: QueryOptions<Entity>,
    @GetResourceService() resourceService: ResourceService,
  ) {
    try {
      return await resourceService.find(queryOptions);
    } catch (err) {
      throw new NotAcceptableException(err);
    }
  }

  @Get(':id')
  @ApiNotAcceptableResponse()
  async findOneById(
    @Param(ParseIntPipe) id: number,
    @GetResourceService() resourceService: ResourceService,
  ) {

    return await resourceService.findOneById(id);

  }

  @Post('query')
  @ApiNotAcceptableResponse()
  async query(
    @Body() queryOptions: QueryOptions<Entity>,
    @GetResourceService() resourceService: ResourceService,
  ) {
    return await resourceService.find(queryOptions);
  }

  @Post()
  @ApiUnprocessableEntityResponse()
  async save(
    value: CreateDTO,
    @GetResourceService() resourceService: ResourceService,
  ) {
    return await resourceService.save(value);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() value: UpdateDTO,
    @GetResourceService() resourceService: ResourceService,
  ) {
    return await resourceService.update(id, value);
  }

  @Delete(':id/:hard')
  async delete(
    @Param('id') id: number,
    @GetResourceService() resourceService: ResourceService,
    @Param('hard', ParseBoolPipe) hard?: boolean,
  ) {
    return await resourceService.delete(id, hard);
  }
}
