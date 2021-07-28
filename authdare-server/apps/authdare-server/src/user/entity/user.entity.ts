import { BaseEntity } from "@authdare/base";
import { genSaltSync, hashSync } from "bcrypt";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { OrgEntity } from "../../org";


@Entity({ name: 'users' })
export class UserEntity extends BaseEntity<UserEntity> {
    static className = "UserEntity";
    @Column({ unique: true }) email: string;
    @Column({
        transformer: {
            to: (value) => hashSync(value, genSaltSync(8)),
            from: (value) => value
        }
    }) password: string;

    @Column() role: string;

    @ManyToOne(() => OrgEntity, org => org.id, { createForeignKeyConstraints: true, })
    @JoinColumn()
    org: OrgEntity
}