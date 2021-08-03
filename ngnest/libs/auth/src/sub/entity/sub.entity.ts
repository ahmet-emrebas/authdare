import { Stringify } from '@authdare/utils';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { SubPermissionDTO } from '../dto';

@Entity({ name: 'subs' })
export class SubEntity {

    @PrimaryGeneratedColumn() id!: number;

    @Column({ unique: true })
    email!: string;

    @Column({})
    password!: string;

    @Column({ unique: true, update: false })
    orgname!: string;

    @Column({
        type: 'text',
        transformer: Stringify()
    })
    permissions!: SubPermissionDTO[];

    constructor(user: SubEntity) {
        Object.assign(this, user);
    }
}