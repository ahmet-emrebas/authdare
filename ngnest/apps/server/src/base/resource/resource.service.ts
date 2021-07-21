import { UnprocessableEntityException } from '@nestjs/common';
import { startCase } from 'lodash';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

export class ResourceService<T = any, C = any, U = any, Q = any> {
  constructor(private _repo: Repository<T>) {}

  async count(query: Q) {
    return await this._repo.count(query);
  }

  /**
   * Save the item to the database if no constraints, and return the saved data
   * @param createDto
   * @returns {C} saved item
   */
  async save(createDto: C) {
    try {
      return await this._repo.save(this._repo.create(createDto));
    } catch (err) {
      if (err.code == 'SQLITE_CONSTRAINT') {
        const fieldName = err.message
          .split(':')
          .reverse()[0]
          .split('.')
          .reverse()[0];
        throw new UnprocessableEntityException(
          `${startCase(fieldName)} is already taken!`,
        );
      }
    }
  }
  /**
   * Save the items to the database if no constraints, and return the saved data
   * @param createDtos
   * @returns {C[]} saved items
   */
  async saveMany(createDtos: C[]) {
    return this._repo.save(createDtos.map((e) => this._repo.create(e)));
  }

  find(query: Partial<Q>) {
    return this._repo.find(query);
  }

  findOne(id: number) {
    return this._repo.findOne(id);
  }

  update(id: number, updateSampleDto: U) {
    return this._repo.update(id, updateSampleDto);
  }

  restore(id: number) {
    return this._repo.restore(id);
  }

  async delete(id: number) {
    return await this._repo.delete(id);
  }

  async deleteMany(ids: number[]) {
    const r = [];
    for (const id of ids) {
      const re = await this.delete(id);
      r.push(re);
    }
    return r;
  }

  /**
   * Do not expose this method to the API
   * @returns
   */
  async deleteAll() {
    const deletes = [];
    const founds = await this.find({});
    for (const i of founds) {
      const d = await this._repo.delete(i['id']);
      deletes.push(d);
    }
    return deletes;
  }

  softDelete(id: number) {
    return this._repo.softDelete(id);
  }
}

/**
 * Testing helper
 */
export class ResourceServiceTest {
  async create(createDto: any): Promise<any> {
    return 'create method response';
  }
  async findAll(query: Partial<any>): Promise<any[]> {
    return 'findAle method response' as any;
  }
  async findOne(id: number): Promise<any> {
    return 'findOne method response';
  }
  async update(id: number, updateSampleDto: any): Promise<UpdateResult> {
    return 'update method response' as any;
  }
  async remove(id: number): Promise<DeleteResult> {
    return 'remove method response' as any;
  }
}

export class RepositoryTest {
  async create(entityLike?: any): Promise<any> {
    return 'create method response' as any;
  }

  async save(entity: any, options?: any): Promise<any> {
    return 'save method response' as any;
  }

  async remove(entity: any, options?: any): Promise<any> {
    return 'remove method response' as any;
  }

  async softRemove(entity: any, options?: any): Promise<any> {
    return 'softRemove method response' as any;
  }

  async update(criteria: string): Promise<UpdateResult> {
    return 'update method response' as any;
  }
  async delete(criteria: string): Promise<DeleteResult> {
    return 'delete method response' as any;
  }
  async softDelete(criteria: string): Promise<UpdateResult> {
    return 'softDelete method response' as any;
  }
  async restore(criteria: string): Promise<UpdateResult> {
    return 'restore method response' as any;
  }
  async count(conditions?: any): Promise<number> {
    return 'count method response' as any;
  }

  async find(conditions?: any): Promise<any[]> {
    return 'find method response' as any;
  }

  async findOne(conditions?: any, options?: any): Promise<any> {
    return 'findOne method response' as any;
  }
}
