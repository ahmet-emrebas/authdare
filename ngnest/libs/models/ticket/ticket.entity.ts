
import { Category, User } from '@authdare/models';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity, } from '@authdare/core';
import { Tag } from '../tag';


@Entity()
export class Ticket extends BaseEntity<Ticket>{
    @Column() ticketName: string;
    @Column() description: string;
    @Column() due: string;
    @Column() status: string;


    @ManyToMany(() => Tag, tag => tag.id, { cascade: true })
    tags: Tag[];


    @ManyToMany(() => Category, category => category.id, { eager: true, createForeignKeyConstraints: true })
    @JoinTable({ name: "ticket_category" })
    category: Category;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    createdBy: User;

    @ManyToMany(() => User, user => user.id, { eager: true, createForeignKeyConstraints: true })
    @JoinTable({ name: "user_ticket" })
    assignedTo: User[]
}