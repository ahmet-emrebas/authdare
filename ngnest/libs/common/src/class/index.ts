import { IsString, MinLength } from 'class-validator';
import { cloneDeep } from 'lodash';
import { t } from '../type';
import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export class CommonConstructor<T> {
    constructor(obj?: T) {
        if (obj) Object.assign(obj, cloneDeep(obj));
    }
}

export class SwaggerOptions extends CommonConstructor<SwaggerOptions> {
    @IsString()
    @MinLength(3)
    title = t<string>();

    @IsString()
    @MinLength(3)
    description = t<string>();
}

export class BaseEntity<T> extends CommonConstructor<T> {
    @PrimaryGeneratedColumn()
    readonly id = t<number>();
    @CreateDateColumn()
    readonly created_at = t<string>();
    @UpdateDateColumn()
    readonly updated_at = t<string>();
    @DeleteDateColumn()
    readonly deleted_at = t<string>();
}
