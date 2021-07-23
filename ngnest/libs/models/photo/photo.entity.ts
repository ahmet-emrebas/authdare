import { Product, Profile, User } from '@authdare/models';


import { BaseEntity, BaseDto } from '@authdare/core';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';



@Entity()
export class Photo extends BaseEntity<Photo>  {
    @Column() photo: string;


    @ManyToOne(() => Profile, profile => profile.photos, { eager: true, createForeignKeyConstraints: true })
    @JoinTable({ name: 'profile_photo' })
    profile: Profile;

    @ManyToOne(() => Product, product => product.photos)
    @JoinTable({ name: 'product_photo' })
    product: Product
}
