import { RoleEntity } from './../role/role.entity';
import { BaseEntity } from "@authdare/base";
import { genSaltSync, hashSync } from "bcrypt";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { OrgEntity } from "../org";



@Entity({ name: 'users' })
export class UserEntity extends BaseEntity<UserEntity> {
    static readonly className = "UserEntity";

    @Column({ unique: true }) email: string;
    @Column({
        transformer: {
            to: (value) => hashSync(value, genSaltSync(8)),
            from: (value) => value
        }
    })
    password: string;

    @ManyToOne(() => OrgEntity, org => org.id, { eager: true, cascade: true, createForeignKeyConstraints: true, })
    @JoinColumn()
    org: OrgEntity

    @ManyToMany(() => RoleEntity, role => role.id, { eager: true, cascade: true, createForeignKeyConstraints: true })
    @JoinTable({ name: 'user_roles' })
    roles: RoleEntity[]
}