import { BaseClass } from './base-class';
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Expose } from 'class-transformer';

export const TIMESTAMP_GROUP = 'TIMESTAMP_GROUP'

/**
 * Typeorm timestamp columns.
 */
export class Timestamp<T> extends BaseClass<T> {
    @Expose() @PrimaryGeneratedColumn() id!: number;
    @Expose({ groups: [TIMESTAMP_GROUP] }) @CreateDateColumn() readonly created_at!: string;
    @Expose({ groups: [TIMESTAMP_GROUP] }) @UpdateDateColumn() readonly updated_at!: string;
    @Expose({ groups: [TIMESTAMP_GROUP] }) @DeleteDateColumn() readonly deleted_at!: string;
}