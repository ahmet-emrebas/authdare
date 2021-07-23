import { BaseEntity } from '@authdare/core';
import { User } from '@authdare/models';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';


@Entity()
export class Permission extends BaseEntity<Permission> {
    @Column() method: string;
    @Column() resource: string;
}

@Entity()
export class Role extends BaseEntity<Role> {
    @Column({ unique: true }) roleName: string;

    @ManyToMany(() => User, user => user.roles)
    users: User[];

    @ManyToMany(() => Permission, permission => permission.id, { eager: true, createForeignKeyConstraints: true })
    @JoinTable({ name: 'role_permission' })
    permissions: Permission[]
}

