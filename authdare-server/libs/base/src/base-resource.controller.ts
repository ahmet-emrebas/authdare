import { QueryOptions } from './query-options';
import { BaseResourceService } from './base-resource.service';
import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

export class BaseController<Entity, CreateDTO, UpdateDTO> {
    constructor(private resourceService: BaseResourceService<Entity, CreateDTO, UpdateDTO>) { }

    @Get()
    async find(@Query() query: QueryOptions<Entity>) {
        return await this.resourceService.find(query);
    }

    @Get(":id")
    async fingById(@Param("id") id: number) {
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


    @Patch(":id")
    async update(@Param("id") id: number, @Body() body: UpdateDTO,) {
        return await this.resourceService.update(id, body);
    }


    @Delete(":id/:hard")
    async delete(@Param("id") id: number, @Param("hard") hard: boolean) {
        if (hard == true)
            return await this.resourceService.deleteHard(id);

        return await this.resourceService.softDelete(id);
    }

}