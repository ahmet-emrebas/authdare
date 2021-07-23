import { Column } from 'typeorm';
import { Entity } from 'typeorm';
import { BaseEntity } from '@authdare/core';


@Entity()
export class Category extends BaseEntity<Category>{
    @Column({ unique: true, nullable: false, length: 50 }) category: string;
}