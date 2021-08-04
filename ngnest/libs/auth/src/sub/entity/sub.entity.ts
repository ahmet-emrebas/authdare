import { Timestamp } from '@authdare/objects';
import { Stringify } from '@authdare/utils';
import { Column, Entity } from 'typeorm'
import { Role } from '../dto';

@Entity({ name: 'subs' })
export class SubEntity extends Timestamp<SubEntity> {

    @Column({ unique: true })
    readonly email!: string;

    @Column({})
    readonly password!: string;

    @Column({ unique: true, update: false })
    readonly orgname!: string;

    @Column({
        type: 'text',
        transformer: Stringify()
    })
    readonly roles!: Role[];

}