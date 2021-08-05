import { CommonColumns } from '@authdare/objects';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'tasks' })
export class TaskEntity extends CommonColumns<TaskEntity>{

    @Column()
    readonly title!: string;

    @Column()
    readonly desc!: string;

}