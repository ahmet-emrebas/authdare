import { BGN } from './group-names';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { t } from './t';

export class BaseEntity<T> {
    @Expose()
    @PrimaryGeneratedColumn()
    readonly id = t<number>();

    @Expose()
    @Column({ type: 'text', update: false })
    readonly orgname = t<string>();

    /**
     * @group { groups: [BGN.TIMESTAMP_GROUP] }
     */
    @Expose({ groups: [BGN.TIMESTAMP_GROUP] })
    @CreateDateColumn()
    readonly created_at = t<string>();

    /**
     * @group { groups: [BGN.TIMESTAMP_GROUP] }
     */
    @Expose({ groups: [BGN.TIMESTAMP_GROUP] })
    @UpdateDateColumn()
    readonly updated_at = t<string>();

    /**
     * @group { groups: [BGN.TIMESTAMP_GROUP] }
     */
    @Expose({ groups: [BGN.TIMESTAMP_GROUP] })
    @DeleteDateColumn()
    readonly deleted_at = t<string>();
}
