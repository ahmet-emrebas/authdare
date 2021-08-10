import { UserEntity } from '@authdare/auth/user/entity/user.entity';
import { BaseEntity } from '@authdare/objects';
import { cloneDeep } from 'lodash';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

function t<T>(): string | undefined {
    return undefined;
}

@Entity({ name: 'tasks' })
export class TaskEntity extends BaseEntity<TaskEntity> {
    @Column({
        type: 'text',
    })
    readonly title = t<string>();
    @Column({
        type: 'text',
    })
    readonly description = t<string>();

    @Column({
        type: 'text',
        default: 'new',
    })
    readonly status = t<string>();

    @ManyToOne(() => UserEntity, (user) => user.id, {
        eager: true,
        createForeignKeyConstraints: true,
    })
    @JoinColumn()
    user? = t<UserEntity>();

    constructor(obj: TaskEntity) {
        super();
        Object.assign(this, cloneDeep(obj));
    }
}
