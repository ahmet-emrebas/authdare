import { ConnectionOptions } from 'typeorm';
import { DatabaseEntity } from './../database';
import { OneToOne } from 'typeorm';
import { EntityBase } from '../base/base';
import { Column, Entity } from 'typeorm';


@Entity({ name: 'orgs' })
export class OrgEntity extends EntityBase<OrgEntity> {
  static readonly className = "OrgEntity";
  @Column({ unique: true }) name: string;

  @OneToOne(() => DatabaseEntity, config => config.org, { eager: true, cascade: true })
  database: ConnectionOptions

}
