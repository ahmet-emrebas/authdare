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
import { TableEntity } from './table.entity';
import { classToPlain } from 'class-transformer';

@ApiTags(TableController.name)
@Controller({
    path: 'tables',
    scope: Scope.DEFAULT,
})
export class TableController {
    constructor(@Inject(TableEntity) private readonly service: ResourceService<TableEntity>) {}

    @QueryRoute()
    async query(@Param('query') query: string, @Param() p: any, @Query() q: any) {
        return await this.service.query(query);
    }

    @FindRoute()
    async find(@Query() query: Record<string, any>, @Param() p: any, @Query() q: any) {
        return await (await this.service.find(query)).map((e) => classToPlain(e));
    }

    @SaveRoute()
    async save(@Body() body: TableEntity, @Param() p: any, @Query() q: any) {
        return await this.service.save(body as any);
    }

    @UpdateRoute()
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updated: TableEntity,
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
