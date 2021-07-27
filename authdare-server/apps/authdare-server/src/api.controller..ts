import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UnauthorizedException } from "@nestjs/common";
import { ApiNotAcceptableResponse, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { QueryOptions } from "./query-options";


export const RESOURCE = 'resource';

@Controller(`api/${RESOURCE}`)
export class ApiController<Entity, CreateDTO, UpdateDTO> {
    @Get()
    @ApiNotAcceptableResponse()
    find(@Query() queryOptions: QueryOptions<Entity>) {
        throw new UnauthorizedException();
    }
    @Get(':id')
    @ApiNotAcceptableResponse()
    findOneById(@Param("id") id: number,) { throw new UnauthorizedException(); }

    @Post('query')
    @ApiNotAcceptableResponse()
    query(@Body() queryOptions: QueryOptions<any>,) { throw new UnauthorizedException(); }

    @Post()
    @ApiUnprocessableEntityResponse()
    save(@Body() value: CreateDTO,) { throw new UnauthorizedException(); }

    @Patch(':id')
    update(@Param('id') id: number, @Body() value: UpdateDTO,) { throw new UnauthorizedException() }

    @Delete(':id/:hard')
    delete(@Param('id') id: number, @Param('hard') hard?: boolean,) { throw new UnauthorizedException() }
}