import { BaseEntity } from '@authdare/core';
import { Column, Entity } from 'typeorm';

@Entity()
export class Tag extends BaseEntity<Tag>{
    @Column({ unique: true }) tag: string;
}