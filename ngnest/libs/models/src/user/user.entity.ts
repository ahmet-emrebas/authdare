import { CommonEntity } from '@authdare/common/class';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends CommonEntity<UserEntity> {
    @Column({ name: 'first_name' })
    firstName?: string;

    @Column({ name: 'last_name' })
    lastName?: string;

    @Column({ unique: true })
    email?: string;

    @Column({})
    password?: string;

    @Column({})
    permissions?: string;

    @OneToMany(() => UserEntity, (user) => user.orgname)
    org?: UserEntity;

    @Column({ nullable: true, unique: true, update: false })
    orgname?: string;
}
