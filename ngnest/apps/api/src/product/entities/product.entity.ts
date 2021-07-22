import { Entity, Column } from "typeorm";
import { BaseEntity } from '@authdare/core'

@Entity({ name: 'products' })
export class Product extends BaseEntity<Product> {

    @Column()
    firstName: string;
}
