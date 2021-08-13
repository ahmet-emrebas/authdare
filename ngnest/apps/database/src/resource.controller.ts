import { ApiTags } from '@nestjs/swagger';
import { DatabaseTokens } from './database-tokens';
import { IResourceController } from '@authdare/common/decorator';
import {
    Controller,
    Get,
    Inject,
    Query,
    Param,
    ParseIntPipe,
    Post,
    Body,
    Patch,
    Delete,
    ParseBoolPipe,
} from '@nestjs/common';
import { ILike, Like, Repository, OrderByCondition } from 'typeorm';
import { UserEntity } from '@authdare/models/user';

@ApiTags(ResourceController.name)
@Controller(':orgname/:resource')
export class ResourceController<T = any> implements IResourceController {
    constructor(@Inject(DatabaseTokens.CLIENT_REPOSITORY) private readonly repo: Repository<T>) {}

    @Get(':query')
    async query(
        @Param('query') query: string,
        @Param('resource') resource?: string,
        @Param('orgname') orgname?: string,
    ) {
        const likeQuery = query.split('&').map((e) => {
            return {
                string: ILike(`%${e}%`),
            };
        });
        console.log(likeQuery);
        return await this.repo.find({
            where: likeQuery,
        });
    }

    @Get('')
    async find(
        @Query('page') page: number,

        @Param('resource') resource?: string,
        @Param('orgname') orgname?: string,
    ) {
        const take = 20;
        const skip = (page - 1) * 20;
        return await this.repo.find({ take, skip });
    }

    @Post()
    async save(
        @Body() body: UserEntity,
        @Param('resource') resource?: string,
        @Param('orgname') orgname?: string,
    ) {
        const instance = this.repo.create(body as any);
        instance.toString();
        const saved: any = await this.repo.save(instance);
        await this.repo.update(saved.id, { string: saved.toString() } as any);
    }
    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updated: any,
        @Param('resource') resource?: string,
        @Param('orgname') orgname?: string,
    ) {
        return await this.repo.update(id, updated);
    }

    @Delete(':id')
    async delete(
        @Param('id', ParseIntPipe) id: number,
        @Param('resource') resource?: string,
        @Param('orgname') orgname?: string,
    ) {
        return await this.repo.softDelete(id);
    }
}
