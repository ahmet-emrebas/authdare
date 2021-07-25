import { BaseEntity } from './../../common';
import { Column, Entity } from 'typeorm';

@Entity()
export class Photo extends BaseEntity<Photo> {
  @Column({ nullable: true, length: 200 }) photo: string;
  @Column({ nullable: true, length: 20 }) position: string;
}
