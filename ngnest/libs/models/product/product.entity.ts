import { Column, OneToOne, JoinColumn } from 'typeorm';
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

    @OneToOne(() => Category, category => category.id)
    @JoinColumn()
    category: Category
}