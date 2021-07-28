import { RoleEntity } from './../role/role.entity';
import { BaseEntity } from '@authdare/base';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity({ name: 'permissions' })
export class PermissionEntity extends BaseEntity<PermissionEntity> {
  static readonly className = 'PermissionEntity';
  @Column() method: string;
  @Column() resource: string;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  roles: RoleEntity[];
}
