
import { Column, JoinTable, } from 'typeorm';
import { Organization, Profile, Role } from '@authdare/models';
import { Entity, JoinColumn, ManyToOne, OneToOne, ManyToMany } from 'typeorm';
import { BaseEntity } from '@authdare/core';

@Entity()
export class User extends BaseEntity<User> {

    @Column() firstName: string;
    @Column() lastName: string;
    @Column() password: string;

    @Column({ unique: true }) email: string;
    @Column({ unique: true }) phone: string;

    @ManyToOne(() => Organization, (org: Organization) => org.users, { eager: true, nullable: false, createForeignKeyConstraints: true })
    organization: Organization;

    @ManyToMany(() => Role, role => role.users, { eager: true, nullable: false, createForeignKeyConstraints: true })
    @JoinTable({ name: 'user_role' })
    roles: Role[];

    @OneToOne(() => Profile, profile => profile.user, { eager: true, cascade: true })
    @JoinColumn()
    profile: Profile;
}