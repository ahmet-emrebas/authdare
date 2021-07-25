import { Organization, Photo, Category } from '@authdare/models';
import { Column, JoinColumn, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '@authdare/core';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class Product extends BaseEntity<Product> {
  @Column({ nullable: false, length: 50 }) brand: string;
  @Column({ nullable: false, length: 50 }) productName: string;
  @Column({ nullable: true, length: 400 }) description: string;
  @Column({ nullable: true, length: 20 }) color: string;
  @Column({ nullable: true }) price: number;
  @Column({ nullable: true }) rate: number;

  @ManyToOne(() => Organization, (org: Organization) => org.id)
  @JoinColumn()
  organization: Organization;

  @ManyToMany(() => Category, (category) => category, {
    eager: true, createForeignKeyConstraints: true,
  })
  @JoinTable({ name: 'product_category' })
  categories: Category[];

  @OneToMany(() => Photo, (photo) => photo.id, { eager: true, createForeignKeyConstraints: true })
  @JoinTable({ name: 'product_photo' })
  photos: Photo[];
}
