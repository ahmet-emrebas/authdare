import { Column, Entity } from 'typeorm';
import { EntityBase } from './../base/base';

@Entity({ name: 'permissions' })
export class PermissionEntity extends EntityBase<PermissionEntity>{
    static readonly className = "PermissionEntity";
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