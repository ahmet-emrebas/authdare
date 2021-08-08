import { BGN } from './group-names';
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';

export class BaseEntity<T> {
    @Expose()
    @PrimaryGeneratedColumn()
    readonly id!: number;

    /**
     * @group { groups: [BGN.TIMESTAMP_GROUP] }
     */
    @Expose({ groups: [BGN.TIMESTAMP_GROUP] })
    @CreateDateColumn()
    readonly created_at!: string;

    /**
     * @group { groups: [BGN.TIMESTAMP_GROUP] }
     */
    @Expose({ groups: [BGN.TIMESTAMP_GROUP] })
    @UpdateDateColumn()
    readonly updated_at!: string;

    /**
     * @group { groups: [BGN.TIMESTAMP_GROUP] }
     */
    @Expose({ groups: [BGN.TIMESTAMP_GROUP] })
    @DeleteDateColumn()
    readonly deleted_at!: string;
}
