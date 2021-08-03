
import { classToPlain, classToClass, Transform } from 'class-transformer';
import { toLocalString } from '../transformers';
import {
  CreateDateColumn,
  DeleteDateColumn,
  MoreThan,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsOptional, validate, isNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import { pickBy } from 'lodash';
import { Groups } from '../groups';

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
    const classInstance = classToClass(this, { groups, excludeExtraneousValues: true, exposeUnsetFields: false });
    const errors = await validate(classInstance, { groups });
    if (errors && errors.length > 0) {
      throw new BadRequestException(errors);
    }
    if (plain) {
      return pickBy(classToPlain(this, { groups }), (v) => isNotEmpty(v)) as unknown as T;  // Ignore the null/undefined/'' values
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
  @Transform(({ value }) => MoreThan(new Date(value)), { groups: [Groups.QUERY] })
  @CreateDateColumn({ transformer: toLocalString })
  created_at?: string;

  @Expose({ groups: [Groups.TIMESTAMP] })
  @IsOptional()
  @Transform(({ value }) => MoreThan(new Date(value)), { groups: [Groups.QUERY] })
  @UpdateDateColumn({ transformer: toLocalString })
  udpated_at?: string;

  @Expose({ groups: [Groups.TIMESTAMP] })
  @IsOptional()
  @Transform(({ value }) => MoreThan(new Date(value)), { groups: [Groups.QUERY] })
  @DeleteDateColumn({ transformer: toLocalString })
  deleted_at?: string;
}
