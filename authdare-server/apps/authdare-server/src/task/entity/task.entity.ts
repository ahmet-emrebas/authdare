import { BaseEntity } from "@authdare/base";
import { Column, Entity } from "typeorm";

@Entity()
export class TaskEntity extends BaseEntity<TaskEntity> {
    static className = "TaskEntity";
    @Column() name: string;
    @Column() description: string;
    @Column() due: string;
    @Column() status: string;
}