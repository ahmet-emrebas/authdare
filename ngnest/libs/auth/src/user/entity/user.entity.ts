import { BaseEntity } from '@authdare/objects';
import { Stringify, HashPassword } from '@authdare/utils';
import { cloneDeep } from 'lodash';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity<UserEntity> {
    @Column({ unique: true, update: false })
    readonly email!: string;

    @Column({ transformer: HashPassword(), update: true })
    readonly password!: string;

    @Column({ type: 'text', transformer: Stringify() })
    readonly permissions!: string[];

    constructor(obj: UserEntity) {
        super();
        Object.assign(this, cloneDeep(obj));
    }
}
