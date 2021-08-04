import { QueryOptions } from './query-options';
import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ToQueryOptionsPipe } from './to-query-options.pipe';
import { BaseResourceService } from './base-resource.service';
import { GetResourceService } from '../get-resource-service.decorator';

/**
 * This class is just a sample, It will NOT in use!
 */
export class BaseController<Entity, CreateDTO, UpdateDTO> {
    constructor(
        protected readonly resourceService: BaseResourceService<
            Entity,
            CreateDTO,
            UpdateDTO
        >,
    ) { }
    @Get()
    async find(@Query(ToQueryOptionsPipe) query: QueryOptions<Entity>) {
        return await this.resourceService.find(query);
    }

    @Get(':id')
    async fingById(@Param('id') id: number) {
        return await this.resourceService.findByIds(id);
    }

    @Post('query')
    async query(@Body() queryOptions: QueryOptions<Entity>) {
        return await this.resourceService.find(queryOptions);
    }

    @Post()
    async create(@Body() body: CreateDTO) {
        return await this.resourceService.create(body);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() body: UpdateDTO) {
        return await this.resourceService.update(id, body);
    }

    @Delete(':id/:hard')
    async delete(@Param('id') id: number, @Param('hard') hard: boolean) {
        if (hard == true) return await this.resourceService.deleteHard(id);
        return await this.resourceService.softDelete(id);
    }
}




/**
 * For client
 */
export class BaseResourceController<Entity, CreateDTO, UpdateDTO> {
    @Get()
    async find(
        @Query(ToQueryOptionsPipe) query: QueryOptions<Entity>,
        @GetResourceService()
        resourceService: BaseResourceService<Entity, CreateDTO, UpdateDTO>,
    ) {
        return await resourceService.find(query);
    }

    @Get(':id')
    async fingById(
        @Param('id') id: number,
        @GetResourceService()
        resourceService: BaseResourceService<Entity, CreateDTO, UpdateDTO>,
    ) {
        return await resourceService.findByIds(id);
    }

    @Post('query')
    async query(
        @Body() queryOptions: QueryOptions<Entity>,
        @GetResourceService()
        resourceService: BaseResourceService<Entity, CreateDTO, UpdateDTO>,
    ) {
        return await resourceService.find(queryOptions);
    }

    @Post()
    async create(
        @Body() body: CreateDTO,
        @GetResourceService()
        resourceService: BaseResourceService<Entity, CreateDTO, UpdateDTO>,
    ) {
        return await resourceService.create(body);
    }

    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() body: UpdateDTO,
        @GetResourceService()
        resourceService: BaseResourceService<Entity, CreateDTO, UpdateDTO>,
    ) {
        return await resourceService.update(id, body);
    }

    @Delete(':id/:hard')
    async delete(
        @Param('id') id: number,
        @Param('hard') hard: boolean,
        @GetResourceService()
        resourceService: BaseResourceService<Entity, CreateDTO, UpdateDTO>,
    ) {
        if (hard == true) return await resourceService.deleteHard(id);
        return await resourceService.softDelete(id);
    }
}