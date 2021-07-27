import { PermissionEntity } from './../permission/permission.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { EntityBase } from './../base/base';

@Entity({ name: "roles" })
export class RoleEntity extends EntityBase<RoleEntity>{
    static readonly className = "RoleEntity";
    @Column({ unique: true }) role: string;

    @ManyToMany(() => PermissionEntity, permission => permission.id, { eager: true, cascade: true, createForeignKeyConstraints: true })
    @JoinTable({ name: 'role_permissions' })
    permmissions: PermissionEntity[];
}