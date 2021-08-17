import { CommonEntity } from '@authdare/common/base';
import { JSONValidator, StringValidator } from '@authdare/common/validation';
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
