import { TimestampFields } from "@authdare/base/entity";
import { entityTableName } from "@authdare/utils/naming";
import { genSaltSync, hashSync } from "bcrypt";
import { Column, Entity } from "typeorm";


export type ClientauthStatusType = 'ACTIVE' | 'PASSIVE';
export const ClientauthStatuses = (): ['ACTIVE', 'PASSIVE'] => ['ACTIVE', 'PASSIVE'];

/**
 * This is only for defination of the table. Do not create any instance of this class, use CreateClientauthDTO AnyClientauthDTO
 */
@Entity(entityTableName(ClientauthEntity))
export class ClientauthEntity extends TimestampFields {
    @Column()
    email: string = undefined;

    @Column({
        transformer: {
            to: (value) => hashSync(value, genSaltSync(8)),
            from: (value) => value
        }
    })
    password: string = undefined;

    @Column({
        transformer: {
            to: (value: string) => value.toLowerCase(),
            from: (value: string) => value
        }
    })
    orgname: string = undefined;

    @Column({
        transformer: {
            to: (value: string[]) => value ? value.join(',')?.toLowerCase() : null,
            from: (value: string) => value.split(',')
        }
    })
    permissions: string = undefined;

    @Column({ nullable: true }) status: ClientauthStatusType = undefined;
}


