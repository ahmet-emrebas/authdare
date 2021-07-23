import { Project } from '@authdare/models';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity, } from '@authdare/core';


@Entity()
export class Sprint extends BaseEntity<Sprint>{
    @Column({}) sprintName: string;
    @Column({}) description: string;

    @ManyToOne(() => Project, project => project.sprints, { eager: true, createForeignKeyConstraints: true })
    @JoinColumn()
    project: Project
}