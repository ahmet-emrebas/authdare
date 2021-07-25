import { Product } from './../../models';
import { Column, ManyToOne } from 'typeorm';
import { Entity } from 'typeorm';
import { BaseEntity } from './../../common';

@Entity()
export class Category extends BaseEntity<Category> {
  @Column({ unique: true, nullable: false, length: 50 }) category: string;
}
