import { CommonEntity } from '@authdare/common/class';
import { StringValidator } from '@authdare/common/decorator';
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
