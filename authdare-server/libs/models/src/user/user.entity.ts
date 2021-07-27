import { Org } from './../org';
import { BaseEntity } from './../base/';
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';
import { Role } from '../role';

@Entity()
export class User extends BaseEntity<User> {

  @Column({ unique: true }) email: string;
  @Column({
    transformer: {
      to: (value) => hashSync(value, genSaltSync(10)),
      from: (value) => value,
    },
  })
  password: string;

  @OneToMany(() => Role, role => role.id, { eager: true, cascade: true })
  @JoinTable({ name: 'user_role' })
  roles: Role[];


  @ManyToOne(() => Org, (org) => org.id, {
    eager: true,
    createForeignKeyConstraints: true,
    cascade: true,
  })
  @JoinColumn()
  org: Org;
}
