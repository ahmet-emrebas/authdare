import { DeleteResult, FindManyOptions, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class ResourceServiceBase<T>{

    constructor(private repository: Repository<T>) { }

    find(options?: FindManyOptions<T>): Promise<T[]> {
        return this.repository.find(options);
    }

    findByIds(ids: number[]): Promise<T[]> {
        return this.repository.findByIds(ids);
    }

    findOneById(id?: number): Promise<T> {
        return this.repository.findOne(id);
    };

    save(obj: T): Promise<T> {
        return this.repository.save(this.repository.create(obj));
    }

    update(id: number, updated: QueryDeepPartialEntity<T>): Promise<UpdateResult> {
        return this.repository.update(id, updated);
    }

    delete(id: number): Promise<DeleteResult> {
        return this.repository.delete(id);
    }

    softDelete(id: number): Promise<UpdateResult> {
        return this.repository.softDelete(id);
    }

    count(conditions?: FindManyOptions): Promise<number> {
        return this.repository.count(conditions);
    }



}