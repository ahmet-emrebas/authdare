import { Column, JoinColumn, JoinTable, OneToOne } from 'typeorm';
import { Organization, Profile, Role } from '@authdare/models';
import { Entity, ManyToOne, ManyToMany } from 'typeorm';
import { BaseEntity } from '@authdare/core';

@Entity()
export class User extends BaseEntity<User> {
  @Column() firstName: string;
  @Column() lastName: string;
  @Column() password: string;

  @Column({ unique: true }) email: string;
  @Column({ unique: true }) phone: string;

  @ManyToOne(() => Organization, (org) => org.id, {
    eager: true,
    nullable: false,
    createForeignKeyConstraints: true,
  })
  organization: Organization;

  @ManyToMany(() => Role, (role) => role.users, {
    eager: true,
    createForeignKeyConstraints: true,
  })
  @JoinTable({ name: 'user_role' })
  roles: Role[];

  @OneToOne(() => Profile, (profile) => profile.id, {
    eager: true,
    createForeignKeyConstraints: true,
  })
  @JoinColumn()
  profile: Profile;
}
