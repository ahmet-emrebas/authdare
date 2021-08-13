import { CommonEntity } from '@authdare/common/class';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'logs' })
export class LogEntity extends CommonEntity<LogEntity> {
    @Column({})
    type?: string;

    @Column({
        type: 'text',
        transformer: { to: (value) => JSON.stringify(value), from: (value) => JSON.parse(value) },
    })
    log?: any;
}
