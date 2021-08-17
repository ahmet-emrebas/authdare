import { CommonEntity } from '@authdare/common/base';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'publics' })
export class PublicUserEntity extends CommonEntity<PublicUserEntity> {
    @Column()
    ip?: string;

    @Column({ nullable: true })
    firstName?: string;

    @Column({ nullable: true })
    lastName?: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    orgname?: string;
}
