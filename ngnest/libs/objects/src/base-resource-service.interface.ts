import { FindManyOptions, FindOneOptions, UpdateResult, DeleteResult } from 'typeorm';
export interface IBaseResourceService<E, C, U> {
    find(options?: FindManyOptions<any>): Promise<E[]>;
    findOne(options?: FindOneOptions<any>): Promise<E | undefined>;
    isExist(options: FindManyOptions<any>): Promise<false | E>;
    findOneById(id: number): Promise<E | undefined>;
    findByIds(...ids: number[]): Promise<E[]>;
    create(createDTO: C): Promise<any>;
    createMany(...createDtos: C[]): Promise<E[]>;
    update(id: number, updated: U): Promise<UpdateResult>;
    updateMany(options: FindOneOptions<any>, updated: U): Promise<UpdateResult[]>;
    deleteHard(id: number): Promise<DeleteResult>;
    softDelete(id: number): Promise<UpdateResult>;
}