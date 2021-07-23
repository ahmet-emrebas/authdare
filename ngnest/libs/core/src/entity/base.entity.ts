import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseDto } from '../dto';

/**
 * Each entity will extend this class
 */
export abstract class BaseEntity<T> extends BaseDto<T> {
  @PrimaryGeneratedColumn({}) id?: number;
  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
  @DeleteDateColumn() deleted_at: Date;
}
