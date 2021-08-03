import { BaseEntity, Groups, QueryOptions } from '@authdare/models';
import { classToPlain } from 'class-transformer';
import { DeepPartial, FindManyOptions, Repository, Like } from 'typeorm';

export class ResourceService<T extends BaseEntity<any>> {
  constructor(private repository: Repository<T>) { }

  async find(query?: QueryOptions<T>) {
    const fieldsQuery = await (this.repository.create(query as any) as unknown as T).validateAndTransformToClassInstance([Groups.QUERY])
    console.log(fieldsQuery);
    const queryOptions = await new QueryOptions(query).validateAndTransformToClassInstance([Groups.QUERY], true)
    return (await this.repository.find({ ...queryOptions, where: { ...fieldsQuery } })).map((e) => classToPlain(e, { groups: [Groups.READ] }));
  }


  async findOne(query?: QueryOptions<T>) {
    const fieldsQuery = await (this.repository.create(query as any) as unknown as T).validateAndTransformToClassInstance([Groups.QUERY], true)
    const queryOptions = await new QueryOptions(query).validateAndTransformToClassInstance([Groups.QUERY], true)
    return classToPlain(await this.repository.findOne({ ...queryOptions, where: fieldsQuery }), { groups: [Groups.READ] });
  }

  async findById(id: number) {
    return classToPlain(await this.repository.findOne(id), { groups: [Groups.READ], });
  }

  async query(queryOptions: FindManyOptions) {
    return (await this.repository.find(queryOptions)).map((e) => classToPlain(e, { groups: [Groups.READ] }));
  }

  async create(value: DeepPartial<T>) {
    const instance = await this.repository.create(value).validateAndTransformToClassInstance([Groups.CREATE]);
    return classToPlain(await this.repository.save(instance), { groups: [Groups.READ], });
  }

  async update(id: number, updated: DeepPartial<T>) {
    return await this.repository.update(id, updated);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}
