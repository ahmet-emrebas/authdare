import { BaseEntity } from '@authdare/core';

import { Organization, Sprint } from '@authdare/models';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';


@Entity()
export class Project extends BaseEntity<Project>{

    @Column({ nullable: false, length: 50 }) projectName: string;
    @Column({ nullable: true, length: 400 }) description: string;
    @Column({ nullable: true, length: 30 }) due: string;

    @ManyToOne(() => Organization, org => org.id, { nullable: false, createForeignKeyConstraints: true })
    @JoinColumn()
    organization: Organization;

}