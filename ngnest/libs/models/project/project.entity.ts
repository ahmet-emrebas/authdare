import { Organization } from '@authdare/models';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';


@Entity()
export class Project {

    @Column() projectName: string;
    @Column() description: string;
    @Column() due: string;

    @ManyToOne(() => Organization, (org: Organization) => org.users, { nullable: false, createForeignKeyConstraints: true })
    organization: Organization;

    @OneToMany(() =>)
    sprints: Sprint
}