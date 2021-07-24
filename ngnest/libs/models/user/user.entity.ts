import { Column, JoinColumn, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { Organization, Role, Profile } from '@authdare/models';
import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '@authdare/core';

@Entity()
export class User extends BaseEntity<User> {
  @Column() firstName: string;
  @Column() lastName: string;
  @Column({ unique: true }) email: string;
  @Column({ unique: true }) phone: string;
  @Column() password: string;


  @ManyToOne(() => Organization, (org) => org.id, {
    eager: true,
    nullable: false,
    createForeignKeyConstraints: true,
  })
  @JoinColumn()
  organization: Organization;


  @ManyToMany(() => Role, role => role.id, { eager: true, createForeignKeyConstraints: true })
  @JoinTable({ name: 'user_role' })
  roles: Role[];

  @OneToOne(() => Profile, profile => profile.user, { eager: true, cascade: true })
  profile: Profile;

}
