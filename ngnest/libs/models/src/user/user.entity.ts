import { CommonEntity } from '@authdare/common/class';
import { genSaltSync, hashSync } from 'bcrypt';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends CommonEntity<UserEntity> {
    @Column({ name: 'first_name' })
    firstName?: string;

    @Column({ name: 'last_name' })
    lastName?: string;

    @Column({ unique: true })
    email?: string;

    @Column({
        transformer: {
            to: (value) => hashSync(value, genSaltSync(8)),
            from: (value) => value,
        },
    })
    password?: string;

    @Column({ nullable: true })
    permissions?: string;

    @Column({ nullable: true, unique: true, update: false })
    orgname?: string;
}
