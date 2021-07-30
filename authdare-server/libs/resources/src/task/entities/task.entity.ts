import { TimestampFields } from "@authdare/base/entity";
import { entityTableName } from "@authdare/utils/naming";
import { Column, Entity } from "typeorm";


export type TaskStatusType = 'DONE' | 'IN PROGRESS' | 'TODO'
export const TaskStatuses = (): ['DONE', 'IN PROGRESS', 'TODO'] => ['DONE', 'IN PROGRESS', 'TODO']

/**
 * This is only for defination of the table. Do not create any instance of this class, use CreateTaskDTO AnyTaskDTO
 */
@Entity(entityTableName(TaskEntity))
export class TaskEntity extends TimestampFields {
    @Column() title: string = undefined;
    @Column() description: string = undefined;
    @Column({ nullable: true }) status: TaskStatusType = undefined;
}


