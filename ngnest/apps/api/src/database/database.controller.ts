import { ApiTags } from '@nestjs/swagger';
import { Controller, Scope, Body, Param, ParseIntPipe, Query, Inject } from '@nestjs/common';
import {
    DeleteRoute,
    FindRoute,
    QueryRoute,
    SaveRoute,
    UpdateRoute,
} from '@authdare/common/openapi';
import { ResourceService } from '@authdare/common/base';
import { classToPlain } from 'class-transformer';
import { DatabaseEntity } from './database.entity';

@ApiTags(DatabaseController.name)
@Controller({
    path: 'databases',
    scope: Scope.DEFAULT,
})
export class DatabaseController {
    constructor(
        @Inject(DatabaseEntity) private readonly service: ResourceService<DatabaseEntity>,
    ) {}

    @QueryRoute()
    async query(@Param('query') query: string, @Param() p: any, @Query() q: any) {
        return await this.service.query(query);
    }

    @FindRoute()
    async find(@Query() query: Record<string, any>, @Param() p: any, @Query() q: any) {
        return await (await this.service.find(query)).map((e) => classToPlain(e));
    }

    @SaveRoute()
    async save(@Body() body: DatabaseEntity, @Param() p: any, @Query() q: any) {
        return await this.service.save(body as any);
    }

    @UpdateRoute()
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updated: DatabaseEntity,
        @Param() p: any,
        @Query() q: any,
    ) {
        return await this.service.update(id, updated as any);
    }

    @DeleteRoute()
    async delete(@Param('id', ParseIntPipe) id: number, @Param() p: any, @Query() q: any) {
        return await this.service.delete(id);
    }
}
