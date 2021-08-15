import { CommonEntity } from '@authdare/common/class';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StringValidator } from '@authdare/common/decorator';
import { IsBoolean, IsEmail } from 'class-validator';
import { arrayTransformer, jsonTransformer } from '@authdare/common/util';

export interface Context {
    title: string;
    subject: string;
    message: string;
}

@Entity({ name: 'mail-templates' })
export class MailTemplatesEntity extends CommonEntity<MailTemplatesEntity> {
    @StringValidator({ max: 100 })
    @Column({ unique: true })
    name?: string;

    @StringValidator()
    @Column()
    html?: string;

    @StringValidator()
    @Column()
    text?: string;

    @Column({ type: 'text', transformer: arrayTransformer() })
    placeholders?: string[];
}

@Entity({ name: 'mails' })
export class MailEntity extends CommonEntity<MailEntity> {
    @StringValidator({ max: 50 })
    @IsEmail()
    @Column()
    to?: string;

    @IsBoolean()
    @Column()
    sent?: boolean;

    @IsBoolean()
    @Column()
    read?: boolean;

    @ManyToOne(() => MailTemplatesEntity, (template) => template)
    @JoinColumn()
    template?: MailTemplatesEntity;

    @Column({
        nullable: true,
        type: 'text',
        transformer: jsonTransformer(),
    })
    context?: string;
}
