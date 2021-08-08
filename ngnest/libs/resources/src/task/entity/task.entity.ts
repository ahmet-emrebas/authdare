import { UserEntity } from '@authdare/auth/user/entity/user.entity';
import { BaseEntity } from '@authdare/objects';
import { cloneDeep } from 'lodash';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'tasks' })
export class TaskEntity extends BaseEntity<TaskEntity> {
    @Column()
    readonly title!: string;

    @Column()
    readonly description!: string;

    @Column({ default: 'new' })
    readonly status!: string;

    @ManyToOne(() => UserEntity, (user) => user.id, { eager: true, createForeignKeyConstraints: true })
    @JoinColumn()
    user?: UserEntity;

    constructor(obj: TaskEntity) {
        super();
        Object.assign(this, cloneDeep(obj));
    }
}
