import { CommonEntity } from '@authdare/common/base';
import { JSONValidator, StringValidator } from '@authdare/common/validation';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'configs' })
export class ConfigEntity extends CommonEntity<ConfigEntity> {
    @StringValidator()
    @Column()
    key?: string;

    @JSONValidator()
    @Column({ type: 'text' })
    value?: Record<string, any>;
}
