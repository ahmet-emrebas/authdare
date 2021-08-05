
import { BaseEntity } from '@authdare/objects';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'tasks' })
export class TaskEntity extends BaseEntity<TaskEntity>{

    @Column()
    readonly title!: string;

    @Column()
    readonly description!: string;

}