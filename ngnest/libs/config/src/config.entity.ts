import { CommonEntity } from '@authdare/common/class';
import { Column, Entity } from 'typeorm';
import { PasswordValidator, StringValidator } from '@authdare/common/decorator';

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

    @PasswordValidator()
    @Column()
    password?: string;
}
