import { ApiTags } from '@nestjs/swagger';
import { Controller, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
    DeleteRoute,
    FindRoute,
    QueryRoute,
    SaveRoute,
    UpdateRoute,
} from '@authdare/common/openapi';
import { I18nValueService } from './i18n.service';
import { I18nKeyEntity } from './i18n.entity';

@ApiTags(I18nKeyController.name)
@Controller('i18n/keys')
export class I18nKeyController {
    constructor(private readonly service: I18nValueService) {}
    @QueryRoute()
    async query(@Param('query') query: string, @Param() p: any, @Query() q: any) {
        return await this.service.query(query);
    }

    @FindRoute()
    async find(@Query() query: Record<string, any>, @Param() p: any, @Query() q: any) {
        return await this.service.find(query);
    }

    @SaveRoute()
    async save(@Body() body: I18nKeyEntity, @Param() p: any, @Query() q: any) {
        return await this.service.save(body as any);
    }

    @UpdateRoute()
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updated: I18nKeyEntity,
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
