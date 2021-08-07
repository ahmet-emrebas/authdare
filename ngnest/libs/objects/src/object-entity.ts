import { BaseEntity } from './base-entity';
import { Stringify } from '@authdare/utils';
import { Column } from 'typeorm';
import { Expose } from 'class-transformer';

export class ObjectEntity<T> extends BaseEntity<T> {
    @Expose()
    @Column({})
    readonly key!: string;

    @Expose()
    @Column({ type: 'text', transformer: Stringify() })
    readonly value!: T;
}
