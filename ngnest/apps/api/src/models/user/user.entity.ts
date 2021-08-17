import { CommonEntity } from '@authdare/common/base';
import { genSaltSync, hashSync } from 'bcrypt';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class ClientUserEntity extends CommonEntity<SubscriberEntity> {
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
}

@Entity({ name: 'clients' })
export class SubscriberEntity extends ClientUserEntity {
    @Column()
    orgname?: string;
    @Column({ nullable: true, unique: true, update: false })
    database?: string;
}
