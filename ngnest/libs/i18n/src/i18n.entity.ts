import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from '@authdare/common/class';

@Entity({ name: 'keys' })
export class I18nKeyEntity extends CommonEntity<I18nKeyEntity> {
    @Column({ unique: true })
    key?: string;
}

@Entity({ name: 'values' })
export class I18nValueEntity extends CommonEntity<I18nValueEntity> {
    @Column()
    lang?: string;

    @ManyToOne(() => I18nKeyEntity, (key) => key.key)
    key?: I18nKeyEntity;
}
