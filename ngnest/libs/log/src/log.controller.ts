import { ApiTags } from '@nestjs/swagger';
import { Controller, Scope, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { LogService } from './log.service';
import {
    DeleteRoute,
    FindRoute,
    QueryRoute,
    SaveRoute,
    UpdateRoute,
} from '@authdare/common/openapi';
import { LogEntity } from './log.entity';

@ApiTags(LogController.name)
@Controller({
    path: 'logs',
    scope: Scope.DEFAULT,
})
export class LogController {
    constructor(private readonly service: LogService) {}

    @QueryRoute()
    async query(@Param('query') query: string, @Param() p: any, @Query() q: any) {
        return await this.service.query(query);
    }

    @FindRoute()
    async find(@Query() query: Record<string, any>, @Param() p: any, @Query() q: any) {
        return await this.service.find(query);
    }

    @SaveRoute()
    async save(@Body() body: LogEntity, @Param() p: any, @Query() q: any) {
        return await this.service.save(body as any);
    }

    @UpdateRoute()
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updated: LogEntity,
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
