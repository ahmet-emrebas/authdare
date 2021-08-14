import { CommonEntity } from '@authdare/common/class';
import { Column, Entity } from 'typeorm';

@Entity()
export class ConfigEntity extends CommonEntity<ConfigEntity> {
    @Column()
    name?: string;

    @Column({ nullable: true })
    module?: string;

    @Column({ default: 'test' })
    mode?: string;

    @Column()
    value?: string;
}
