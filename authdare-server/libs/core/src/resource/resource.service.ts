import { NotAcceptableException } from '@nestjs/common';
import { UnprocessableEntityException } from '@nestjs/common';
import { genToken, QueryOptions } from '@authdare/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

export const RESOURCE_SERVICE_TOKEN = genToken();

export class ResourceService<
  Entity = any,
  CreateDTO = any,
  UpdateDTO = any,
  > {
  constructor(private repo: Repository<any>) { }

  async find(queryOptions: QueryOptions<Entity>): Promise<Entity[]> {
    try {
      return await this.repo.find(queryOptions);
    } catch (err) {
      throw new NotAcceptableException(err);
    }
  }

  async findOne(queryOption: QueryOptions<Entity>): Promise<Entity> {
    try {
      return await this.repo.findOne(queryOption);
    } catch (err) {
      throw new NotAcceptableException(err);
    }
  }

  async findOneById(id: number): Promise<Entity> {
    try {
      return await this.repo.findOne(id);
    } catch (err) {
      throw new NotAcceptableException(err);
    }
  }

  async save(value: CreateDTO): Promise<Entity> {
    try {
      const created = await this.repo.create(value);
      return await this.repo.save(created);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }
  async update(id: number, value: UpdateDTO): Promise<UpdateResult> {
    try {
      return await this.repo.update(id, value);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async delete(id: number, hard?: boolean): Promise<DeleteResult> {
    try {
      return await this.repo.delete(id);
    } catch (err) {
      throw new NotAcceptableException(err);
    }
  }
}
