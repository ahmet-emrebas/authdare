import { Stringify } from '@authdare/utils';
import { Permission } from "@authdare/auth/role";
import { Column, Entity } from "typeorm";
import { BaseEntity } from '@authdare/objects';

@Entity({ name: 'roles' })
export class RoleEntity extends BaseEntity<RoleEntity> {
    @Column({ unique: true })
    readonly name!: string;
    @Column({ type: 'text', transformer: Stringify() })
    readonly permissions!: Permission[]
}