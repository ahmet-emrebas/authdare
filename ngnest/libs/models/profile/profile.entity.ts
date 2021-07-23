import { User } from '@authdare/models';
import { BaseEntity } from '@authdare/core';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity()
export class Profile extends BaseEntity<Profile>  {
    @Column() photo: string;

    @OneToOne(() => User, user => user.profile)
    user: User
}