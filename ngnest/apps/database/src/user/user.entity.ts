import { BaseEntity } from '@authdare/common/class';
import { t } from '@authdare/common/type';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity<UserEntity> {
    @Column()
    email = t<string>();
}
