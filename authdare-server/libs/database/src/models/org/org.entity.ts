import { DatabaseEntity } from './../database';
import { OneToOne, JoinTable, JoinColumn } from 'typeorm';
import { EntityBase } from '../base/base';
import { Column, Entity } from 'typeorm';


@Entity({ name: 'orgs' })
export class OrgEntity extends EntityBase<OrgEntity> {
  static readonly className = "OrgEntity";
  @Column({ unique: true }) name: string;

  @OneToOne(() => DatabaseEntity, db => db.id, { eager: true, cascade: true })
  @JoinColumn()
  database: DatabaseEntity

}
