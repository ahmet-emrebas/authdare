import { BadRequestException } from '@nestjs/common';
import { BaseEntity, Groups, QueryOptions } from '@authdare/models';
import { classToPlain } from 'class-transformer';
import { DeepPartial, FindManyOptions, Repository, Like } from 'typeorm';

export class ResourceService<T extends BaseEntity<any>> {
  constructor(private repository: Repository<T>) { }


  async find(query?: QueryOptions<T>) {
    const queryOptions = await new QueryOptions(query).validateAndTransformToClassInstance([Groups.QUERY], true)
    const fieldsQuery = await (this.repository.create(query as any) as unknown as T).validateAndTransformToClassInstance([Groups.QUERY])
    console.log(fieldsQuery)
    try {
      return (await this.repository.find({ ...queryOptions, where: { ...fieldsQuery } })).map((e) => classToPlain(e, { groups: [Groups.READ] }));
    } catch (err) {
      throw new BadRequestException("Malformed Query");
    }
  }

  async findOne(query?: QueryOptions<T>) {
    const queryOptions = await new QueryOptions(query).validateAndTransformToClassInstance([Groups.QUERY], true)
    const fieldsQuery = await (this.repository.create(query as any) as unknown as T).validateAndTransformToClassInstance([Groups.QUERY])
    try {

      return classToPlain(await this.repository.findOne({ ...queryOptions, where: fieldsQuery }), { groups: [Groups.READ] });
    } catch (err) {
      throw new BadRequestException("Malformed Query");
    }
  }

  async findById(id: number) {
    try {
      return classToPlain(await this.repository.findOne(id), { groups: [Groups.READ], });
    } catch (err) {
      throw new BadRequestException("Malformed Query");
    }
  }

  async query(queryOptions: FindManyOptions) {
    try {
      return (await this.repository.find(queryOptions)).map((e) => classToPlain(e, { groups: [Groups.READ] }));
    } catch (err) {
      throw new BadRequestException("Malformed Query");;
    }
  }

  async create(value: DeepPartial<T>) {
    const instance = await this.repository.create(value).validateAndTransformToClassInstance([Groups.CREATE]);
    try {
      return classToPlain(await this.repository.save(instance), { groups: [Groups.READ], });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async update(id: number, updated: DeepPartial<T>) {
    try {

      return await this.repository.update(id, updated);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async delete(id: number) {
    try {
      return await this.repository.delete(id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
