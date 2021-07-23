import { BaseEntity } from '@authdare/core';

import { Organization, Sprint } from '@authdare/models';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';


@Entity()
export class Project extends BaseEntity<Project>{

    @Column() projectName: string;
    @Column() description: string;
    @Column() due: string;

    @ManyToOne(() => Organization, (org: Organization) => org.users, { nullable: false, createForeignKeyConstraints: true })
    organization: Organization;

    @OneToMany(() => Sprint, sprint => sprint.project)
    sprints: Sprint[]
}