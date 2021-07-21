import { NotImplementedException } from '@nestjs/common';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseClass<T> {
  constructor(obj: T) {
    Object.assign(this, obj);
  }
}

/**
 * Base entity that contains id, created, updated, and deleted columns.
 */
export abstract class BaseEntity<T> extends BaseClass<T> {
  @PrimaryGeneratedColumn() id?: number;
  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
  @DeleteDateColumn() deleted_at: Date;
  @Column({ nullable: true, default: 'default' }) test_field?: string;

  uniqueColumns(): (keyof T)[] {
    throw new NotImplementedException();
  }
}
