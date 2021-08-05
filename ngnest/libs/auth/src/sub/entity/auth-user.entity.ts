import { BaseEntity } from '@authdare/objects';
import { Stringify, HashPassword } from '@authdare/utils';
import { Column, Entity } from 'typeorm'
import { Role } from '../../role';

@Entity({ name: 'subs' })
export class AuthUserEntity extends BaseEntity<AuthUserEntity> {

    @Column({ unique: true })
    readonly email!: string;

    @Column({ transformer: HashPassword() })
    readonly password!: string;

    @Column({ unique: true, update: false })
    readonly orgname!: string;

    @Column({ type: 'text', transformer: Stringify() })
    readonly roles!: Role[];


}