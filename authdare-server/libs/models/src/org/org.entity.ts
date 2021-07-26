import { BaseEntity } from '../base/base';
import { Column, Entity } from 'typeorm';

@Entity()
export class Org extends BaseEntity<Org> {
  @Column({ unique: true }) name: string;
}
