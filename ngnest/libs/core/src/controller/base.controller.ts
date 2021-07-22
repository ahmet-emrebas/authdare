import { Post, Body, Get, Patch, Delete, Param, Query, } from "@nestjs/common";
import { FindManyOptions } from 'typeorm'
import { BaseResourceService } from "./base.resource-service";

export class BaseController<Entity, CreateDTO, UpdateDTO> {
    constructor(private readonly resourceService: BaseResourceService<Entity, CreateDTO, UpdateDTO>) { }

    @Post()
    async create(@Body() createProductDto: CreateDTO) {
        return await this.resourceService.save(createProductDto);
    }

    @Get()
    async findAll(@Query() query: FindManyOptions) {
        return await this.resourceService.find(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.resourceService.find({ where: { id } });
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateProductDto: UpdateDTO) {
        return await this.resourceService.update(id, updateProductDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.resourceService.delete(id);
    }
}