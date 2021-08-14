import { ApiTags } from '@nestjs/swagger';
import {
    Controller,
    Scope,
    Post,
    Body,
    Param,
    Patch,
    ParseIntPipe,
    Delete,
    Get,
    Query,
} from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigEntity } from './config.entity';

@ApiTags(ConfigController.name)
@Controller({
    path: 'config',
    scope: Scope.DEFAULT,
})
export class ConfigController {
    constructor(private readonly service: ConfigService) {}

    @Get(':query')
    async query(
        @Param('query') query: string,
        @Param('resource') resource?: string,
        @Param('orgname') orgname?: string,
    ) {
        return await this.service.query(query);
    }

    @Get()
    async find(
        @Query() query: Record<string, any>,
        @Param('resource') resource?: string,
        @Param('orgname') orgname?: string,
    ) {
        return await this.service.find(query);
    }

    @Post()
    async save(
        @Body() body: ConfigEntity,
        @Param('resource') resource?: string,
        @Param('orgname') orgname?: string,
    ) {
        return await this.service.save(body as any);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updated: ConfigEntity,
        @Param('resource') resource?: string,
        @Param('orgname') orgname?: string,
    ) {
        return await this.service.update(id, updated as any);
    }

    @Delete(':id')
    async delete(
        @Param('id', ParseIntPipe) id: number,
        @Param('resource') resource?: string,
        @Param('orgname') orgname?: string,
    ) {
        return await this.service.delete(id);
    }
}
