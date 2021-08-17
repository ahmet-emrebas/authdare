import { Query, Param, ParseIntPipe, Body } from '@nestjs/common';
import { DeleteRoute, FindRoute, QueryRoute, SaveRoute, UpdateRoute } from '../../decorator';
import { ResourceService } from './resource.service';

export class ResourceController<T = any> {
    constructor(protected readonly service: ResourceService<T>) {}

    @QueryRoute()
    async query(@Param('query') query: string, @Param() p: any, @Query() q: any) {
        return await this.service.query(query);
    }

    @FindRoute()
    async find(@Query() query: Record<string, any>, @Param() p: any, @Query() q: any) {
        return await this.service.find(query);
    }

    @SaveRoute()
    async save(@Body() body: T, @Param() p: any, @Query() q: any) {
        return await this.service.save(body as any);
    }

    @UpdateRoute()
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updated: T,
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
