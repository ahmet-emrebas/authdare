import { IBaseResourceService } from './base-resource-service.interface';
import { FindManyOptions, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { Logger, NotAcceptableException } from '@nestjs/common';

export class BaseResourceService<Entity extends { id: any }, CreateDTO, UpdateDTO>
    implements IBaseResourceService<Entity, CreateDTO, UpdateDTO>
{
    constructor(
        private readonly repo: Repository<Entity>,
        private readonly logger: Logger,
    ) {}

    async find(options?: FindManyOptions): Promise<Entity[]> {
        return await this.repo.find(options);
    }

    async findOne(options?: FindOneOptions) {
        return this.repo.findOne(options);
    }

    /**
     * Find one or fail
     * @param options
     * @returns UserEntity
     * @throws Error
     */
    async isExist(options: FindOneOptions) {
        return await this.repo.findOneOrFail(options);
    }

    async findOneById(id: number) {
        return this.repo.findOne(id);
    }

    async findByIds(...ids: number[]) {
        return await this.repo.findByIds(ids);
    }

    async create(createDTO: CreateDTO): Promise<Entity> {
        return await this.repo.save(createDTO as any);
    }

    async createMany(...createDTOs: CreateDTO[]): Promise<Entity[]> {
        return await this.repo.save(createDTOs as any);
    }

    async update(
        id: string | number | undefined,
        updated: UpdateDTO,
    ): Promise<UpdateResult> {
        return this.repo.update(id!, updated as any);
    }

    async updateMany(
        options: FindManyOptions,
        updated: UpdateDTO,
    ): Promise<UpdateResult[]> {
        const found = await this.repo.find(options);
        const result: UpdateResult[] = [];
        if (found) {
            for (const f of found) {
                result.push(await this.repo.update(f.id, updated as any));
            }
        }
        return result;
    }

    async delete(id: number) {
        return await this.repo.delete(id);
    }

    async softDelete(id: number): Promise<UpdateResult> {
        return await this.repo.softDelete(id);
    }
}
