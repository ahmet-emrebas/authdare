import { BGN } from './group-names';
import { BaseClass } from './base-class';
import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Expose } from 'class-transformer';
import { Stringify } from '@authdare/utils';
import { IsNumber, ValidateNested } from 'class-validator';


export class BaseEntity<T> extends BaseClass<T>{

    @Expose()
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Expose({ groups: [BGN.GROUP_ID] })
    @Column({ nullable: true, update: false })
    readonly group_id!: number;

    /**
     * @group { groups: [BGN.OWNER] }
     */
    @Expose({ groups: [BGN.OWNER] })
    @Column({ nullable: true })
    readonly created_by!: number;

    /**
     * Define which users associated with this entity.
     * @group { groups: [BGN.FOR_WHOM] }
     */
    @Expose({ name: "associates", groups: [BGN.FOR_WHOM] })
    @Column({ nullable: true, type: 'text', transformer: Stringify() })
    @ValidateNested({ each: true })
    @IsNumber()
    readonly for_whom!: number[];


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