import { ResponseBody, Hash, Repo } from './../interface';
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

export class CommonEntity<T> extends CommonConstructor<T> {
    @PrimaryGeneratedColumn()
    readonly id = t<number>();
    @CreateDateColumn()
    readonly created_at = t<string>();
    @UpdateDateColumn()
    readonly updated_at = t<string>();
    @DeleteDateColumn()
    readonly deleted_at = t<string>();
}

export class ResourceService<T, A, Q> implements Repo<T, A, Q> {
    findMany(query: Q): Promise<ResponseBody<T[], A>[]> {
        throw new Error('Method not implemented.');
    }
    query(query: string | number): Promise<ResponseBody<T[], A>> {
        throw new Error('Method not implemented.');
    }
    findOne(query: Q): Promise<ResponseBody<T, A>> {
        throw new Error('Method not implemented.');
    }
    post(body: T): Promise<ResponseBody<T, A>> {
        throw new Error('Method not implemented.');
    }
    patch(id: number, updated: Partial<T>): Promise<ResponseBody<T, A>> {
        throw new Error('Method not implemented.');
    }
    delete(id: number): Promise<ResponseBody<T, A>> {
        throw new Error('Method not implemented.');
    }
}

export class HashService implements Hash {
    hash(value: any): Promise<string> {
        throw new Error('Method not implemented.');
    }
    verify(hashValue: string, rawValue: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}
