
import { BaseEntity } from '@authdare/core';
import { Column, Entity } from 'typeorm';

@Entity()
export class Organization extends BaseEntity<Organization>{
    @Column({ unique: true, nullable: false, length: 50 })
    organizationName: string;
}