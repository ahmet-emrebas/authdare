import { CommonEntity } from '@authdare/common/base';
import { StringValidator } from '@authdare/common/validation';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'configs' })
export class ConfigEntity extends CommonEntity<ConfigEntity> {
    @StringValidator()
    @Column()
    name?: string;

    @StringValidator()
    @Column({ nullable: true })
    group?: string;

    @StringValidator()
    @Column({ nullable: true })
    mode?: string;

    @StringValidator()
    @Column()
    value?: string;
}
