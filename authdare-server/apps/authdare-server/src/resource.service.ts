import { classToPlain } from 'class-transformer';
import { BaseEntity } from './models/base.entity';
import { DeepPartial, FindManyOptions, Repository } from "typeorm";
import { Groups } from './models';

export class ResourceService<T extends BaseEntity<any>> {

    constructor(private repository: Repository<T>) { }

    async find(query?: FindManyOptions) {
        return (await this.repository.find(query)).map(e => classToPlain(e, { groups: [Groups.READ] }));
    }

    async findById(id: number) {
        return classToPlain(await this.repository.findOne(id), { groups: [Groups.READ] });
    }

    async create(value: DeepPartial<T>) {
        const instance = await this.repository.create(value).validateAndTransformToClassInstance([Groups.CREATE])
        return classToPlain(await this.repository.save(instance), { groups: [Groups.READ] });
    }


    async update(id: number, updated: DeepPartial<T>) {
        return await this.repository.update(id, updated);
    }


    async delete(id: number) {
        return await this.repository.delete(id);
    }


}