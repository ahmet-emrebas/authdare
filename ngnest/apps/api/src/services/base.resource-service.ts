import { Repository } from 'typeorm';
import { Constructor, validateDto, QueryOptions } from '../common';
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
    try {
      return await this.repository.save(this.repository.create(value))
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async find(options?: QueryOptions<T>) {
    try {
      return await this.repository.find(options);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async update(id: number | string, value: UpdateDTO) {
    const errors = await validateDto(new this.updateDTO(value));
    if (errors && errors.length > 0) {
      throw new UnprocessableEntityException(errors);
    }

    try {
      return await this.repository.update(id, value)
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async delete(id: number | string) {
    try {
      return await this.repository.delete(id);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }
}
