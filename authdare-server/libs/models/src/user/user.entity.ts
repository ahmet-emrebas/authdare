import { Org } from './../org';
import { BaseEntity } from './../base/';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';

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
  @Column({ default: null }) role: string;

  @ManyToOne(() => Org, (org) => org.id, {
    eager: true,
    createForeignKeyConstraints: true,
    cascade: true,
  })
  @JoinColumn()
  org: Org;
}
