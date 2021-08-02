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
import { BadRequestException } from '@nestjs/common';

export class BaseValidator<T> {
  constructor(obj?: Omit<T, 'validateAndTransformToClassInstance'>) {
    Object.assign(this, obj);
  }

  /**
   * Validate and transform the data return the instance or object of the data. 
   * If data is not valid, thow BadRequestException
   * @param {Groups} groups 
   * @param {boolean} plain if true, plain object will be returned, class instance otherwise
   * @returns Object or Class instance by Group
   * @throws BadRequestException
   */
  async validateAndTransformToClassInstance(groups?: Groups[], plain?: boolean): Promise<T> | never {
    const classInstance = classToClass(this, { groups });
    const errors = await validate(classInstance, { groups });
    if (errors && errors.length > 0) {
      throw new BadRequestException(errors);
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
