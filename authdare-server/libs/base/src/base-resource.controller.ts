import { QueryOptions } from './query-options';
import { BaseResourceService } from './base-resource.service';
import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { GetResourceService } from './get-resource-service.decorator';
import { ToQueryOptionsPipe } from './to-query-options.pipe';


/**
 * For client
 */
export class BaseResourceController<Entity, CreateDTO, UpdateDTO> {
    @Get()
    async find(
        @Query(ToQueryOptionsPipe) query: QueryOptions<Entity>,
        @GetResourceService() resourceService: BaseResourceService<Entity, CreateDTO, UpdateDTO>
    ) {
        return await resourceService.find(query)
    }

    @Get(":id")
    async fingById(
        @Param("id") id: number,
        @GetResourceService() resourceService: BaseResourceService<Entity, CreateDTO, UpdateDTO>
    ) {
        return await resourceService.findByIds(id);
    }

    @Post('query')
    async query(
        @Body() queryOptions: QueryOptions<Entity>,
        @GetResourceService() resourceService: BaseResourceService<Entity, CreateDTO, UpdateDTO>
    ) {
        return await resourceService.find(queryOptions);
    }

    @Post()
    async create(
        @Body() body: CreateDTO,
        @GetResourceService() resourceService: BaseResourceService<Entity, CreateDTO, UpdateDTO>
    ) {
        return await resourceService.create(body);
    }

    @Patch(":id")
    async update(
        @Param("id") id: number,
        @Body() body: UpdateDTO,
        @GetResourceService() resourceService: BaseResourceService<Entity, CreateDTO, UpdateDTO>
    ) {
        return await resourceService.update(id, body);
    }

    @Delete(":id/:hard")
    async delete(
        @Param("id") id: number,
        @Param("hard") hard: boolean,
        @GetResourceService() resourceService: BaseResourceService<Entity, CreateDTO, UpdateDTO>
    ) {
        if (hard == true)
            return await resourceService.deleteHard(id);
        return await resourceService.softDelete(id);
    }

}