import { UnprocessableEntityException } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { ClassConstructor } from 'class-transformer';
import { QueryOptions } from './query-options';

export class BaseResourceService<Entity, CreateDTO, UpdateDTO> {
  constructor(
    readonly repo: Repository<Entity>,
    readonly createDto: ClassConstructor<CreateDTO>,
    readonly updateDTO: ClassConstructor<UpdateDTO>,
  ) { }

  protected async validate(
    dto: ClassConstructor<CreateDTO | UpdateDTO>,
    value: CreateDTO | UpdateDTO,
  ): Promise<boolean> | never {
    const errors = await validate(new dto(value) as any);
    if (errors && errors.length) {
      throw new UnprocessableEntityException(errors);
    }
    return true;
  }

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
      await this.validate(this.createDto, createDTO);
      const created = await this.repo.create(createDTO);
      return await this.repo.save(created);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async createMany(...createDtos: CreateDTO[]) {
    try {
      for (const d of createDtos) {
        await this.validate(this.createDto, d);
      }
      const created = await this.repo.create(createDtos);
      return await this.repo.save(created);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async update(id: number, updated: UpdateDTO) {
    try {
      await this.validate(this.updateDTO, updated);
      await this.repo.update(id, updated);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async updateMany(options: QueryOptions<Entity>, updated: UpdateDTO) {
    try {
      await this.validate(this.updateDTO, updated);
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
