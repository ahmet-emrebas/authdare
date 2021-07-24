import { QueryOptions } from './query-options';
import { Repository } from 'typeorm';
import { Constructor } from '@authdare/core';
import { validateDto } from '../dto';
import { UnprocessableEntityException } from '@nestjs/common';

export class BaseResourceService<T = any, CreateDTO = any, UpdateDTO = any> {
  constructor(
    private readonly repository: Repository<T>,
    private readonly createDTO: Constructor,
    private readonly updateDTO: Constructor
  ) { }

  async save(value: CreateDTO): Promise<T> {
    const errors = await validateDto(new this.createDTO(value));
    if (errors && errors.length > 0) {
      throw new UnprocessableEntityException(errors);
    }
    return await this.repository.save(this.repository.create(value))
  }

  async find(options?: QueryOptions<T>) {
    return await this.repository.find(options);
  }

  async update(id: number | string, value: UpdateDTO) {
    const errors = await validateDto(new this.updateDTO(value));
    if (errors && errors.length > 0) {
      throw new UnprocessableEntityException(errors);
    }
    return await this.repository.update(id, value)
  }

  async delete(id: number | string) {
    return await this.repository.delete(id);
  }
}
