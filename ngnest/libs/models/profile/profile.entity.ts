import { Photo } from './../photo/photo.entity';
import { User } from '@authdare/models';
import { BaseEntity } from '@authdare/core';
import {
  Entity,
  JoinTable,
  OneToMany,
  OneToOne,
  Column,
} from 'typeorm';

@Entity()
export class Profile extends BaseEntity<Profile> {

  @Column({ length: 400 })
  nickname: string;

  @OneToMany(() => Photo, (photo) => photo.id, { eager: true, createForeignKeyConstraints: true })
  @JoinTable({ name: 'profile_photo' })
  photos: Photo[];

  @OneToOne(() => User, (user) => user.profile, { createForeignKeyConstraints: true })
  user: User;

}
