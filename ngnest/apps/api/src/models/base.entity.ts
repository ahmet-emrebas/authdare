import { classToPlain, classToClass } from 'class-transformer';
import { Groups } from './groups';
import { toLocalString } from './transformers';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsOptional, validate } from 'class-validator';
import { Expose } from 'class-transformer';
import { UnprocessableEntityException } from '@nestjs/common';

export class BaseValidator<T> {
  constructor(obj?: T) {
    Object.assign(this, obj);
  }
  async validateAndTransformToClassInstance?(
    groups?: Groups[],
    plain?: boolean,
  ): Promise<T> | never {
    const classInstance = classToClass(this, { groups });
    const errors = await validate(classInstance, { groups });
    if (errors && errors.length > 0) {
      throw new UnprocessableEntityException(errors);
    }
    if (plain) {
      return classToPlain(this, { groups }) as unknown as T;
    }
    return classInstance as unknown as T;
  }
}

export class BaseEntity<T extends object> extends BaseValidator<T> {
  @Expose({ groups: [Groups.READ, Groups.AUTH_COOKIE] })
  @IsOptional()
  @PrimaryGeneratedColumn()
  id?: number;
  @Expose({ groups: [Groups.TIMESTAMP] })
  @IsOptional()
  @CreateDateColumn({ transformer: toLocalString })
  created_at?: string;
  @Expose({ groups: [Groups.TIMESTAMP] })
  @IsOptional()
  @UpdateDateColumn({ transformer: toLocalString })
  udpated_at?: string;
  @Expose({ groups: [Groups.TIMESTAMP] })
  @IsOptional()
  @DeleteDateColumn({ transformer: toLocalString })
  deleted_at?: string;
}
