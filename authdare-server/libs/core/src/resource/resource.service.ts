import { NotAcceptableException } from '@nestjs/common';
import { UnprocessableEntityException } from '@nestjs/common';
import { genToken, QueryOptions } from '@authdare/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ClassConstructor } from 'class-transformer';
import { validate } from 'class-validator';

export const RESOURCE_SERVICE_TOKEN = genToken();

export class ResourceService<
  Entity = any,
  CreateDTO extends {} = any,
  UpdateDTO extends {} = any,
  > {
  constructor(private repo: Repository<any>, private readonly createDto: ClassConstructor<CreateDTO>, private readonly updateDto: ClassConstructor<UpdateDTO>) { }

  private async validateCreateDTO(value: CreateDTO) {
    const instance = new this.createDto(value);
    const errors = await validate(instance);
    if (errors && errors.length > 0) {
      throw new UnprocessableEntityException(errors);
    }
  }

  private async validateUpdateDTO(value: UpdateDTO) {
    const instance = new this.updateDto(value);
    const errors = await validate(instance);
    if (errors && errors.length > 0) {
      throw new UnprocessableEntityException(errors);
    }
  }


  async find(queryOptions?: QueryOptions<Entity>): Promise<Entity[]> {
    try {
      return await this.repo.find(queryOptions);
    } catch (err) {
      throw new NotAcceptableException(err);
    }
  }

  async findOne(queryOption?: QueryOptions<Entity>): Promise<Entity> {
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
    await this.validateCreateDTO(value);
    try {
      const created = await this.repo.create(value);
      return await this.repo.save(created);
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }
  async update(id: number, value: UpdateDTO): Promise<UpdateResult> {
    await this.validateUpdateDTO(value);
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
