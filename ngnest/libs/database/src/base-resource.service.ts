import { IBaseResourceService } from './base-resource-service.interface';
import { BadRequestException, Logger } from '@nestjs/common';
import { DeleteResult, FindManyOptions, FindOneOptions, Repository, UpdateResult } from 'typeorm';


export class BaseResourceService<Entity extends { id: any }, CreateDTO, UpdateDTO> implements IBaseResourceService<Entity, CreateDTO, UpdateDTO> {

    constructor(private readonly repo: Repository<Entity>, private readonly logger: Logger) { }

    private async wrapper<R>(handler: () => Promise<any>): Promise<R> {
        try {
            return await handler()
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException()
        }
    }

    async find(options?: FindManyOptions): Promise<Entity[]> {
        return await this.wrapper<Entity[]>(() => this.find(options));
    }

    async findOne(options?: FindOneOptions) {
        return this.wrapper<Entity>(() => this.repo.findOne(options))
    }

    async isExist(options: FindOneOptions) {
        try {
            return await this.repo.findOneOrFail(options);
        } catch (err) {
            return false
        }
    }

    async findOneById(id: number) {
        return this.wrapper<Entity>(() => this.repo.findOne(id));
    }

    async findByIds(...ids: number[]) {
        return await this.wrapper<Entity[]>(() => this.repo.findByIds(ids));
    }

    async create(createDTO: CreateDTO): Promise<Entity> {
        return await this.wrapper<Entity>(() => this.repo.save(createDTO as any));
    }

    async createMany(...createDTOs: CreateDTO[]): Promise<Entity[]> {
        return await this.wrapper<Entity[]>(() => this.repo.save(createDTOs as any))
    }

    async update(id: number, updated: UpdateDTO): Promise<UpdateResult> {
        return await this.wrapper<UpdateResult>(() => this.repo.update(id, updated as any));
    }



    async updateMany(options: FindManyOptions, updated: UpdateDTO): Promise<UpdateResult[]> {
        const found = await this.repo.find(options);
        const result: UpdateResult[] = [];
        if (found) {
            for (const f of found) {
                result.push(await this.repo.update(f.id, updated as any))
            }
        }
        return result;
    }

    async deleteHard(id: number) {
        return await this.wrapper<DeleteResult>(() => this.repo.delete(id));
    }

    async softDelete(id: number): Promise<UpdateResult> {
        return await this.wrapper<UpdateResult>(() => this.repo.softDelete(id));
    }
}