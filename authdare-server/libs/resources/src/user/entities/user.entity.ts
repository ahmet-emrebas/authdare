import { TimestampFields } from "@authdare/base/entity";
import { entityTableName } from "@authdare/utils/naming";
import { genSaltSync, hashSync } from "bcrypt";
import { Column, Entity } from "typeorm";


export type UserStatusType = 'ACTIVE' | 'PASSIVE';
export const UserStatuses = (): ['ACTIVE', 'PASSIVE'] => ['ACTIVE', 'PASSIVE'];

/**
 * This is only for defination of the table. Do not create any instance of this class, use CreateUserDTO AnyUserDTO
 */
@Entity(entityTableName(UserEntity))
export class UserEntity extends TimestampFields {
    @Column() email: string = undefined;
    @Column({
        transformer: {
            to: (value) => hashSync(value, genSaltSync(8)),
            from: (value) => value
        }
    }) password: string = undefined;
    @Column() org: string = undefined;
    @Column({ nullable: true }) status: UserStatusType = undefined;
}


