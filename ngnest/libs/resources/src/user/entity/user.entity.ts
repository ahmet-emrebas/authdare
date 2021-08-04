import { CommonColumns } from '@authdare/objects';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends CommonColumns<UserEntity>{
    @Column() readonly email!: string;
    @Column() readonly role!: string;
}