import { Body, Delete, Get, Patch, Post, Query } from "@nestjs/common";
import { ResourceServiceBase } from "./resource-service.base";


export class ResourceControllerBase<T, C, R, U, Q> {
    constructor(private resourceService: ResourceServiceBase<T>) { }

    @Get()
    get(@Query() query: Q) {

    }

    @Post()
    query(@Body() query: Q) { }

    @Post()
    post() { }

    @Patch()
    patch() { }

    @Delete()
    delete() { }
}