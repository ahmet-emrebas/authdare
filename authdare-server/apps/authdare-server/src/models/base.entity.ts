import { classToClass, plainToClass } from 'class-transformer';
import { ClassConstructor } from 'class-transformer';
import { Groups } from './groups';
import { toLocalString } from './utils';
import { CreateDateColumn, DeleteDateColumn, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsOptional, validate } from 'class-validator';
import { Expose } from 'class-transformer';
import { UnprocessableEntityException } from '@nestjs/common';


export class BaseValidator<T>{
    constructor(obj?: T) {
        Object.assign(this, obj);
    }
    async validateAndTransformToClassInstance?(groups?: Groups[]): Promise<T> | never {
        const orgClassInstance = classToClass(this, { groups });
        const errors = await validate(orgClassInstance);
        if (errors && errors.length > 0) {
            throw new UnprocessableEntityException(errors);
        }
        return orgClassInstance as unknown as T;
    }
}


export class BaseEntity<T extends object> extends BaseValidator<T> {
    @Expose() @IsOptional() @PrimaryGeneratedColumn() id?: number;
    @Expose({ groups: [Groups.TIMESTAMP] }) @IsOptional() @CreateDateColumn({ transformer: toLocalString }) created_at?: string;
    @Expose({ groups: [Groups.TIMESTAMP] }) @IsOptional() @UpdateDateColumn({ transformer: toLocalString }) udpated_at?: string;
    @Expose({ groups: [Groups.TIMESTAMP] }) @IsOptional() @DeleteDateColumn({ transformer: toLocalString }) deleted_at?: string;
}
