import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UnauthorizedException, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiNotAcceptableResponse, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { ApiInterceptor } from '../interceptors';
import { ApiGuard } from '../guards';
import { BasicQueryOptions, AdvanceQueryOptions } from "../common";


export const RESOURCE = 'resource';

@ApiTags(ApiController.name)
@UseGuards(ApiGuard)
@UseInterceptors(ApiInterceptor)
@Controller(`api/:${RESOURCE}`)
export class ApiController<Entity, CreateDTO, UpdateDTO> {
    @Get()
    @ApiNotAcceptableResponse()
    find(@Query() queryOptions: BasicQueryOptions<Entity>, @Param(RESOURCE) resource: string) { throw new UnauthorizedException(); }

    @Get(':id')
    @ApiNotAcceptableResponse()
    findOneById(@Param("id") id: number, @Param(RESOURCE) resource: string) { throw new UnauthorizedException(); }

    @Post('query')
    @ApiNotAcceptableResponse()
    query(@Body() queryOptions: AdvanceQueryOptions<any>, @Param(RESOURCE) resource: string) { throw new UnauthorizedException(); }

    @Post()
    @ApiUnprocessableEntityResponse()
    save(@Body() value: CreateDTO, @Param(RESOURCE) resource: string) { throw new UnauthorizedException(); }

    @Patch(':id')
    update(@Param('id') id: number, @Body() value: UpdateDTO, @Param(RESOURCE) resource: string) { throw new UnauthorizedException() }

    @Delete(':id/:hard')
    delete(@Param('id') id: number, @Param(RESOURCE) resource: string, @Param('hard') hard?: boolean) { throw new UnauthorizedException() }
}