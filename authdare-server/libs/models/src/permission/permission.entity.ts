import { Column, Entity } from 'typeorm';
import { BaseEntity } from './../base/base';

@Entity()
export class Permission extends BaseEntity<Permission>{
    @Column({ nullable: false }) resource: string;
    @Column({ nullable: false }) method: string;
    @Column({
        nullable: false, transformer: {
            to: (value) => value.join(','),
            from: (value) => value.split(',')
        }
    })
    properties: string
}