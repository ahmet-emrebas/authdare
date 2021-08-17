import { cloneDeep } from 'lodash';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

/**
 * Constructor with deep clone which will prevent code from unspable state.
 *
 */
export class CommonConstructor<T> {
    constructor(obj?: T) {
        if (obj) Object.assign(this, cloneDeep(obj));
    }
}

/**
 * Common entitiy field for tables.
 */
export class CommonEntity<T> extends CommonConstructor<Omit<T, 'toQueryString'>> {
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

    /**
     * Query string of the data that will allow us to query each field with URL Query string.
     */
    static toQueryString(partial?: Partial<CommonEntity<any>>) {
        let _obj = partial || this;
        const stringVersion: string = Object.entries(_obj)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        return stringVersion;
    }
}
