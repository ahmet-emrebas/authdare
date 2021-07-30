import { TimestampFields } from "@authdare/base/entity";
import { entityTableName } from "@authdare/utils/naming";
import { genSaltSync, hashSync } from "bcrypt";
import { Column, Entity } from "typeorm";


export type AuthStatusType = 'ACTIVE' | 'PASSIVE';
export const AuthStatuses = (): ['ACTIVE', 'PASSIVE'] => ['ACTIVE', 'PASSIVE'];

/**
 * This is only for defination of the table. Do not create any instance of this class, use CreateAuthDTO AnyAuthDTO
 */
@Entity(entityTableName(AuthEntity))
export class AuthEntity extends TimestampFields {
    @Column() email: string = undefined;

    @Column({
        transformer: {
            to: (value) => hashSync(value, genSaltSync(8)),
            from: (value) => value
        }
    }) password: string = undefined;

    @Column() orgname: string = undefined;

    @Column({
        transformer: {
            to: (value) => value ? value.join(',') : null,
            from: (value) => value.split(',')
        }
    })
    permissions: string = undefined;

    @Column({ nullable: true }) status: AuthStatusType = undefined;
}


