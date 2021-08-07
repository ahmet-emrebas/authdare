import { Controller, Get, Param, Post } from '@nestjs/common';
import { Connection } from 'typeorm';

@Controller(':orgname/:resource')
export class ResourceController {
    constructor() {}
    @Get()
    get(@Param('orgname') orgname: string, @Param('resource') resource: string) {}
}

@Controller('database')
export class DatabaseController {
    async createTable(orgname: string) {}

    @Post()
    async createDatabase(orgname: string): Promise<Connection> {
        throw new Error('Not implemetned');
    }
}
