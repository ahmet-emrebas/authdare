import { IBaseResourceService } from './base-resource-service.interface';
import { BadRequestException, Logger } from '@nestjs/common';
import { BaseClass } from './base-class';
import { UnprocessableEntityException } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { BaseEntity } from './base-entity';


export class BaseResourceService<
    Entity extends BaseEntity<Entity>,
    CreateDTO extends BaseClass<any>,
    UpdateDTO extends BaseClass<any>
    >
    implements IBaseResourceService<Entity, CreateDTO, UpdateDTO> {

    constructor(private readonly repo: Repository<Entity>, private readonly logger: Logger) { }

    async find(options?: FindManyOptions) {

        try {
            return await this.repo.find(options);
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException();
        }
    }

    async findOne(options?: FindOneOptions) {
        try {
            return await this.repo.findOne(options);
        } catch (err) {
            throw new UnprocessableEntityException(err);
        }
    }

    async isExist(options: FindOneOptions) {
        try {
            const found = await this.repo.findOneOrFail(options);
            return found;
        } catch (err) {
            return false
        }
    }


    async findOneById(id: number) {
        try {
            return await this.repo.findOne(id);
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException()
        }
    }

    async findByIds(...ids: number[]) {
        try {
            return await this.repo.findByIds(ids);
        } catch (err) {
            throw new UnprocessableEntityException(err);
        }
    }

    async create(createDTO: CreateDTO): Promise<Entity> {
        try {
            return await this.repo.save(createDTO as any);
        } catch (err) {
            throw new UnprocessableEntityException(err);
        }
    }

    async createMany(...createDTOs: CreateDTO[]): Promise<Entity[]> {
        try {
            return await this.repo.save(createDTOs as any);
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException();
        }
    }

    async update(id: number, updated: UpdateDTO): Promise<UpdateResult> {
        try {
            return await this.repo.update(id, updated as any);
        } catch (err) {
            throw new UnprocessableEntityException(err);
        }
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
        try {
            return await this.repo.delete(id);
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException();
        }
    }

    async softDelete(id: number) {
        try {
            return await this.repo.softDelete(id);
        } catch (err) {
            this.logger.error(err);
            throw new UnprocessableEntityException(err);
        }
    }
}