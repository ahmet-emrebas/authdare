import { CommonEntity } from '@authdare/common/class';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'configs' })
export class ConfigEntity extends CommonEntity<ConfigEntity> {
    @Column()
    name?: string;

    @Column({
        type: 'text',
        transformer: {
            to: (value) => JSON.stringify(value),
            from: (value) => JSON.parse(value),
        },
    })
    value?: string;
}
