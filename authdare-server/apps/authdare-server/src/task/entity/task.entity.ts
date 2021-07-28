import { BaseEntity } from "@authdare/base";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { OrgEntity } from "../../org";

@Entity()
export class TaskEntity extends BaseEntity<TaskEntity> {
    static className = "TaskEntity";
    @Column() name: string;
    @Column() description: string;
    @Column() due: string;
    @Column() status: string;

    @ManyToOne(() => OrgEntity, org => org.id, { createForeignKeyConstraints: true })
    @JoinColumn()
    org: OrgEntity
}