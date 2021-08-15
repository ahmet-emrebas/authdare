import { CommonEntity } from '@authdare/common/class';
import { JSONValidator, StringValidator } from '@authdare/common/decorator';
import { Column, Entity } from 'typeorm';
import { jsonTransformer } from '@authdare/common/util';

@Entity({ name: 'events' })
export class EventEntity extends CommonEntity<EventEntity> {
    @StringValidator()
    @Column()
    name?: string;

    @JSONValidator()
    @Column({
        type: 'text',
        nullable: true,
        transformer: jsonTransformer(),
    })
    payload?: Record<string, any>;
}
