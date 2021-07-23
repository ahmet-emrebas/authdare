import { Column, OneToOne, JoinColumn, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { Organization, Category } from '@authdare/models';
import { BaseEntity } from '@authdare/core';
import { Entity, ManyToOne } from 'typeorm';


@Entity()
export class Product extends BaseEntity<Product>{

    @Column() brand: string;
    @Column() productname: string;
    @Column() description: string;
    @Column() details: string;
    @Column() price: number;

    @ManyToOne(() => Organization, (org: Organization) => org.products)
    organization: Organization;

    @ManyToMany(() => Category, category => category.id, { eager: true, nullable: false, createForeignKeyConstraints: true })
    @JoinTable({ name: 'product_category' })
    categories: Category[]
}