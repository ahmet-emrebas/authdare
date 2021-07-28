import { PermissionEntity } from './../permission/permission.entity';
import { BaseEntity } from '@authdare/base';
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

@Entity({ name: 'roles' })
export class RoleEntity extends BaseEntity<RoleEntity> {
    static readonly className = "RoleEntity";
    @Column({ unique: true }) name: string;

    @ManyToMany(() => PermissionEntity, permission => permission.roles, { eager: true })
    @JoinTable({ name: "role_permissions" })
    permissions: PermissionEntity[]
}