import { BaseClass } from './base-class';
import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Expose } from 'class-transformer';
import { Stringify, Trim } from '@authdare/utils';
import { IsNumber, Length, ValidateNested } from 'class-validator';

/**
 * Common Columns Group
 */
export enum CCG {
    TIMESTAMP_GROUP = 'TIMESTAMP_GROUP',
    NAMES = 'NAMES',
    OWNER = 'OWNER',
    FOR_WHOM = 'FOR_WHOM',
    REQUIRED_ROLE = 'REQUIRED_ROLE',
}

/**
 * Database Table Common columns.
 */
export class CommonColumns<T> extends BaseClass<T> {
    @Expose()
    @PrimaryGeneratedColumn()
    id!: number;

    @Expose({ groups: [CCG.NAMES] })
    @Column({ nullable: true, type: 'text' })
    readonly names!: string[];


    @Expose({ groups: [CCG.OWNER] })
    @Column({ nullable: true })
    readonly created_by!: number;


    @Expose({ groups: [CCG.REQUIRED_ROLE] })
    @Column({ nullable: true, type: 'text', transformer: Stringify() })
    @Trim()
    @ValidateNested({ each: true })
    @Length(1, 30)
    readonly required_roles!: string[];


    @Expose({ groups: [CCG.FOR_WHOM] })
    @Column({ nullable: true, type: 'text', transformer: Stringify() })
    @ValidateNested({ each: true })
    @IsNumber()
    readonly for_whom!: number[];



    @Expose({ groups: [CCG.TIMESTAMP_GROUP] })
    @CreateDateColumn()
    readonly created_at!: string;

    @Expose({ groups: [CCG.TIMESTAMP_GROUP] })
    @UpdateDateColumn()
    readonly updated_at!: string;

    @Expose({ groups: [CCG.TIMESTAMP_GROUP] })
    @DeleteDateColumn()
    readonly deleted_at!: string;

}