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
    NestInterceptor,
    CallHandler,
    ExecutionContext,
    UseInterceptors,
} from '@nestjs/common';
import { ILike, Like, Repository, OrderByCondition } from 'typeorm';
import { UserEntity } from '@authdare/models/user';
import { isArray, omit } from 'lodash';
import { map, Observable } from 'rxjs';

class OmitInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data) => {
                if (isArray(data)) {
                    return data.map((e) => omit(e, 'string'));
                }
                return omit(data, 'string');
            }),
        );
    }
}

@UseInterceptors(OmitInterceptor)
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
        const likeQuery = query.split('&').map((e) => ({ string: ILike(`%${e}%`) }));
        return await this.repo.find({ take: 20, where: likeQuery });
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
        return saved;
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
