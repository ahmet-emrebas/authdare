import { ConnectionOptions } from 'typeorm';
import { Database } from './../database';
import { OneToOne } from 'typeorm';
import { BaseEntity } from '../base/base';
import { Column, Entity } from 'typeorm';


@Entity()
export class Org extends BaseEntity<Org> {

  @Column({ unique: true }) name: string;

  @OneToOne(() => Database, config => config.org, { eager: true, cascade: true })
  database: ConnectionOptions

}
