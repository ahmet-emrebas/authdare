import { BaseEntity } from '@authdare/core';
import { Column, Entity } from 'typeorm';

@Entity()
export class Appliance extends BaseEntity<Appliance> {
  @Column() applianceName: string;
  @Column() condition: string;
}
