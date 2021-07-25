import { ResourceService } from './resource.service';
import { QueryOptions } from "@authdare/common";
import { Get, NotAcceptableException, Param, ParseIntPipe, Post, UnprocessableEntityException, Patch, Delete } from "@nestjs/common";
import { ApiNotAcceptableResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { GetResourceService } from './get-resource-service.decorator';


/**
 * You can either extend or implement this class for your Resouce controllers.
 */
export class ResourceController<Entity, CreateDTO, UpdateDTO> {


    @Get()
    @ApiNotAcceptableResponse()
    async find(queryOptions: QueryOptions<Entity>, @GetResourceService() resourceService: ResourceService) {
        try {
            return await resourceService.find(queryOptions);
        } catch (err) {
            throw new NotAcceptableException(err);
        }
    }

    @Get(":id")
    @ApiNotAcceptableResponse()
    async findOneById(@Param(ParseIntPipe) id: number, @GetResourceService() resourceService: ResourceService) {
        try {
            return await resourceService.findOneById(id)
        } catch (err) {
            throw new NotAcceptableException(err);
        }
    }

    @Post('query')
    @ApiNotAcceptableResponse()
    async query(queryOptions: QueryOptions<Entity>, @GetResourceService() resourceService: ResourceService) {
        try {
            return await resourceService.find(queryOptions);
        } catch (err) {
            throw new NotAcceptableException(err);
        }
    }

    @Post()
    @ApiUnprocessableEntityResponse()
    async save(value: CreateDTO, @GetResourceService() resourceService: ResourceService) {
        try {
            return await resourceService.save(value);
        } catch (err) {
            throw new UnprocessableEntityException(err);
        }
    }

    @Patch(":id")
    async update(@Param('id') id: number, value: UpdateDTO, @GetResourceService() resourceService: ResourceService) {
        try {
            return await resourceService.update(id, value);
        } catch (err) {
            throw new UnprocessableEntityException(err);
        }
    }

    @Delete(":id")
    async delete(@Param('id') id: number, @GetResourceService() resourceService: ResourceService, hard?: boolean,) {
        try {
            return await resourceService.delete(id, hard)
        } catch (err) {
            throw new NotAcceptableException(err)
        }

    }

}