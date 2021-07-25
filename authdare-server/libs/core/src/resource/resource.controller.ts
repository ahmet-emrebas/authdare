import { ResourceService, RESOURCE_SERVICE_TOKEN } from './resource.service';
import { QueryOptions } from "@authdare/common";
import { Get, NotAcceptableException, Inject, Param, ParseIntPipe, Post, UnprocessableEntityException, Patch, Delete } from "@nestjs/common";
import { ApiNotAcceptableResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';


/**
 * You can either extend or implement this class for your Resouce controllers. RESOURCE_SERVICE_TOKEN must be provided in the module.
 */
export class ResourceController<Entity, CreateDTO, UpdateDTO> {

    constructor(@Inject(RESOURCE_SERVICE_TOKEN) private readonly resourceServie: ResourceService<Entity, CreateDTO, UpdateDTO>) { }

    @Get()
    @ApiNotAcceptableResponse()
    async find(queryOptions: QueryOptions<Entity>) {
        try {
            return await this.resourceServie.find(queryOptions);
        } catch (err) {
            throw new NotAcceptableException(err);
        }
    }

    @Get(":id")
    @ApiNotAcceptableResponse()
    async findOneById(@Param(ParseIntPipe) id: number) {
        try {
            return await this.resourceServie.findOneById(id)
        } catch (err) {
            throw new NotAcceptableException(err);
        }
    }

    @Post('query')
    @ApiNotAcceptableResponse()
    async query(queryOptions: QueryOptions<Entity>) {
        try {
            return await this.resourceServie.find(queryOptions);
        } catch (err) {
            throw new NotAcceptableException(err);
        }
    }

    @Post()
    @ApiUnprocessableEntityResponse()
    async save(value: CreateDTO) {
        try {
            return await this.resourceServie.save(value);
        } catch (err) {
            throw new UnprocessableEntityException(err);
        }
    }

    @Patch(":id")
    async update(id: number, value: UpdateDTO) {
        try {
            return await this.resourceServie.update(id, value);
        } catch (err) {
            throw new UnprocessableEntityException(err);
        }
    }

    @Delete(":id")
    async delete(id: number, hard?: boolean) {
        try {
            return await this.resourceServie.delete(id, hard)
        } catch (err) {
            throw new NotAcceptableException(err)
        }

    }

}