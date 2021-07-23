import { BaseEntity } from '@authdare/core';
import { User } from '@authdare/models';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';


@Entity()
export class Role extends BaseEntity<Role> {
    @Column({ unique: true, length: 20 }) roleName: string;

    @ManyToMany(() => User, user => user.roles)
    users: User[];

    @ManyToMany(() => Permission, permission => permission.id, { eager: true, createForeignKeyConstraints: true })
    @JoinTable({ name: 'role_permission' })
    permissions: Permission[]
}



@Entity()
export class Permission extends BaseEntity<Permission> {
    @Column({ length: 20 }) label: string;
    @Column({ length: 20 }) method: string;
    @Column({ length: 20 }) resource: string;
}

