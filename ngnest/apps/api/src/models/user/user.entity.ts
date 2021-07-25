import { Column, JoinColumn, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { Organization, Role, Profile } from './../../models';
import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './../../common';

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


  /**
   * createForeignKeyConstraints
   * Indicates that roles must exist. 
   */
  @ManyToMany(() => Role, role => role.id, { eager: true, createForeignKeyConstraints: true })
  @JoinTable({ name: 'user_role' })
  roles: Role[];

  /**
   * Cascase
   * Create profile if does not exist. 
   * Relate profile with user by ID if the profile with the id exists.
   */
  @OneToOne(() => Profile, profile => profile.user, { eager: true, cascade: true })
  profile: Profile;

}
