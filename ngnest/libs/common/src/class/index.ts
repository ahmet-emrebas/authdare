import { cloneDeep } from 'lodash';
import {
    Column,
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

export class CommonEntity<T> extends CommonConstructor<T> {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn()
    created_at?: string;

    @UpdateDateColumn()
    updated_at?: string;

    @DeleteDateColumn()
    deleted_at?: string;

    @Column({ nullable: true })
    string?: string;

    toString() {
        const stringVersion = Object.entries(this)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        this.string = stringVersion;
        return stringVersion;
    }
}
