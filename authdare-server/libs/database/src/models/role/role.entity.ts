import { Permission } from './../permission/permission.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './../base/base';

@Entity()
export class Role extends BaseEntity<Role>{

    @Column({ unique: true }) role: string;

    @ManyToMany(() => Permission, permission => permission.id, { eager: true, cascade: true, createForeignKeyConstraints: true })
    @JoinTable({ name: 'role_permissions' })
    permmissions: Permission[];
}