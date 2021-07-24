import { User } from '@authdare/models';
import { BaseEntity } from '@authdare/core';
import {
  Entity,
  OneToOne,
  Column,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Profile extends BaseEntity<Profile> {

  @Column({ length: 400 })
  nickname: string;

  @OneToOne(() => User, user => user.profile, { createForeignKeyConstraints: true })
  @JoinColumn()
  user: User;
}
