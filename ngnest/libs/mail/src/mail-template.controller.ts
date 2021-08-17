import { ApiTags } from '@nestjs/swagger';
import { Controller, Scope, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { MailTemplateService } from './mail.service';
import {
    DeleteRoute,
    FindRoute,
    QueryRoute,
    SaveRoute,
    UpdateRoute,
} from '@authdare/common/openapi';
import { MailEntity } from './mail.entity';

@ApiTags(MailTemplateController.name)
@Controller({
    path: 'mail-templates',
    scope: Scope.DEFAULT,
})
export class MailTemplateController {
    constructor(private readonly service: MailTemplateService) {}

    @QueryRoute()
    async query(@Param('query') query: string, @Param() p: any, @Query() q: any) {
        return await this.service.query(query);
    }

    @FindRoute()
    async find(@Query() query: Record<string, any>, @Param() p: any, @Query() q: any) {
        return await this.service.find(query);
    }

    @SaveRoute()
    async save(@Body() body: MailEntity, @Param() p: any, @Query() q: any) {
        return await this.service.save(body as any);
    }

    @UpdateRoute()
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updated: MailEntity,
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
