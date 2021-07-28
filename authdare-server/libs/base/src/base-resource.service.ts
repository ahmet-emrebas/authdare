import { UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QueryOptions } from './query-options';

export class BaseResourceService<Entity, CreateDTO, UpdateDTO> {
  constructor(readonly repo: Repository<Entity>) { }

  async find(options?: QueryOptions<Entity>) {
    try {
      return await this.repo.find(options);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async findOne(options: QueryOptions<Entity> | number) {
    try {
      return await this.repo.findOne(options);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async findByIds(...ids: number[]) {
    try {
      return await this.repo.findByIds(ids);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async create(createDTO: CreateDTO) {
    try {
      const created = await this.repo.create(createDTO);
      return await this.repo.save(created);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async createMany(...createDtos: CreateDTO[]) {
    try {
      const created = await this.repo.create(createDtos);
      return await this.repo.save(created);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async update(id: number, updated: UpdateDTO) {
    try {
      await this.repo.update(id, updated);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async updateMany(options: QueryOptions<Entity>, updated: UpdateDTO) {
    try {
      return await this.repo.update(options, updated);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async deleteHard(id: number) {
    try {
      return await this.repo.delete(id);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async softDelete(id: number) {
    try {
      return await this.repo.softDelete(id);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }
}
