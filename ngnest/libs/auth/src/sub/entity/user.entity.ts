import { BaseEntity } from '@authdare/objects';
import { Stringify, HashPassword } from '@authdare/utils';
import { Column, Entity } from 'typeorm'

@Entity({ name: 'subs' })
export class UserEntity extends BaseEntity<UserEntity> {

    @Column({ unique: true, update: false })
    readonly email!: string;

    @Column({ transformer: HashPassword(), update: true })
    readonly password!: string;

    @Column({ update: false })
    readonly orgname!: string;

    // @Column({ type: 'text', transformer: Stringify() })
    // readonly roles!: Role[];


}