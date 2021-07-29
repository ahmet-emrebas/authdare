import { TimestampFields } from "@authdare/base"
import { entityTableName } from "@authdare/utils";
import { Column, Entity } from "typeorm";

/**
 * This is only for defination of the table. Do not create any instance of this class, use CreateTaskDTO AnyTaskDTO
 */
@Entity(entityTableName(TaskEntity))
export class TaskEntity extends TimestampFields {
    @Column() title: string = undefined;
    @Column() description: string = undefined;
}


