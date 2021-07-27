import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class EntityBase<T> {
  @PrimaryGeneratedColumn() id: number;
  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
  @DeleteDateColumn() deleted_at: Date;
  constructor(obj?: Partial<T>) {
    Object.assign(this, obj);
  }
}

export class DtoBase<T>{
  constructor(obj: T) {
    Object.assign(this, obj);
  }
}