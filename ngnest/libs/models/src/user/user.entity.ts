import { CommonEntity } from '@authdare/common/class';
import { t } from '@authdare/common/type';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends CommonEntity<UserEntity> {
    @Column({ name: 'first_name', type: 'text' })
    firstName = t<string>();

    @Column({ name: 'last_name', type: 'text' })
    lastName = t<string>();

    @Column({ type: 'text', unique: true })
    email = t<string>();

    @Column({ type: 'text' })
    password = t<string>();

    @Column({ type: 'text' })
    orgname = t<string>();
}
