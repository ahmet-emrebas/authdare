import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from '@authdare/common/class';

@Entity({ name: 'i18n_keys' })
export class I18nKeyEntity extends CommonEntity<I18nKeyEntity> {
    @Column({ unique: true })
    key?: string;
}

@Entity({ name: 'i18n_values' })
export class I18nValueEntity extends CommonEntity<I18nValueEntity> {
    @Column()
    lang?: string;

    @ManyToOne(() => I18nKeyEntity, (key) => key.key)
    key?: I18nKeyEntity;
}
