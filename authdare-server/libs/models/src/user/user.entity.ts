import { Org } from './../org';
import { BaseEntity } from './../base/';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class User extends BaseEntity<User> {
  @Column() email: string;
  @Column() password: string;
  @Column() role: string;

  @ManyToOne(() => Org, (org) => org.id, {
    eager: false,
    createForeignKeyConstraints: true,
    cascade: true,
  })
  @JoinColumn()
  org: Org;
}
