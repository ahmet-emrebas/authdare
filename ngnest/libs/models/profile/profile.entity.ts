import { Photo } from './../photo/photo.entity';

import { User } from '@authdare/models';
import { BaseEntity } from '@authdare/core';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';


@Entity()
export class Profile extends BaseEntity<Profile>  {

    @OneToMany(() => Photo, photo => photo.profile)
    photos: Photo[];

    @OneToOne(() => User, user => user.profile)
    @JoinColumn()
    user: User
}