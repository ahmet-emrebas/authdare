import { DeepPartial, DeleteResult, FindConditions, FindManyOptions, FindOneOptions, ObjectID, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class ResourceServiceBase<T>{

    constructor(private repository: Repository<T>) { }

    save<T extends DeepPartial<T>>(entity: T): Promise<T & T> {
        throw new Error('Method not implemented.');
    }

    update(criteria: string | number | Date | ObjectID | string[] | number[] | Date[] | ObjectID[] | FindConditions<T>, partialEntity: QueryDeepPartialEntity<T>): Promise<UpdateResult> {
        throw new Error('Method not implemented.');
    }

    delete(criteria: string | number | Date | ObjectID | string[] | number[] | Date[] | ObjectID[] | FindConditions<T>): Promise<DeleteResult> {
        throw new Error('Method not implemented.');
    }

    softDelete(criteria: string | number | Date | ObjectID | string[] | number[] | Date[] | ObjectID[] | FindConditions<T>): Promise<UpdateResult> {
        throw new Error('Method not implemented.');
    }

    count(conditions?: FindManyOptions): Promise<number> {
        throw new Error('Method not implemented.');
    }

    find(options?: FindManyOptions<T>): Promise<T[]> {
        throw new Error('Method not implemented.');
    }

    findByIds(ids: number[]): Promise<T[]> {
        throw new Error('Method not implemented.');
    }

    findOneById(id?: string | number | Date | ObjectID, options?: FindOneOptions<T>): Promise<T> {
        throw new Error('method not implemented')
    };

    findOne(conditions?: any, options?: any): Promise<T> {
        throw new Error('Method not implemented.');
    }

}