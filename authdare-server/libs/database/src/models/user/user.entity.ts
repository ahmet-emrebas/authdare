import { OrgEntity } from './../org';
import { EntityBase } from './../base/';
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';
import { RoleEntity } from '../role';

@Entity({ name: "users" })
export class UserEntity extends EntityBase<UserEntity> {
  static readonly className = "UserEntity";

  @Column({ unique: true }) email: string;
  @Column({
    transformer: {
      to: (value) => hashSync(value, genSaltSync(10)),
      from: (value) => value,
    },
  })
  password: string;

  @OneToMany(() => RoleEntity, role => role.id, { eager: true, cascade: true })
  @JoinTable({ name: 'user_role' })
  roles: RoleEntity[];


  @ManyToOne(() => OrgEntity, (org) => org.id, {
    eager: true,
    createForeignKeyConstraints: true,
    cascade: true,
  })
  @JoinColumn()
  org: OrgEntity;
}
