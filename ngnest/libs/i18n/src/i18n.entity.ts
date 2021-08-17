import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CommonEntity } from '@authdare/common/base';
import { StringValidator } from '@authdare/common/validation';

@Entity({ name: 'i18n_keys' })
export class I18nKeyEntity extends CommonEntity<I18nKeyEntity> {
    @StringValidator()
    @Column({ unique: true })
    key?: string;
}

@Entity({ name: 'i18n_values' })
export class I18nValueEntity extends CommonEntity<I18nValueEntity> {
    @StringValidator()
    @Column()
    lang?: string;

    @ApiProperty({ default: { id: 1 } })
    @OneToOne(() => I18nKeyEntity, (key) => key)
    @JoinColumn()
    key?: I18nKeyEntity;
}
