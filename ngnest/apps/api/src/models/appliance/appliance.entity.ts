import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common';

@Entity()
export class Appliance extends BaseEntity<Appliance> {
  @Column() applianceName: string;
  @Column() condition: string;
}
