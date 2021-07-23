
import { BaseEntity } from '@authdare/core';
import { User, Product } from '@authdare/models';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Organization extends BaseEntity<Organization>{

    @Column({ unique: true, nullable: false })
    organizationName: string;

    @OneToMany(() => User, user => user.organization)
    users: User[];

    @OneToMany(() => Product, product => product.organization)
    products: Product[]

}