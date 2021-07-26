import { BaseEntity } from './../base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Org extends BaseEntity<Org> {
  @Column({ unique: true }) name: string;
}
