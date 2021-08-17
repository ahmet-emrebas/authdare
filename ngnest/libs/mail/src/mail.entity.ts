import { CommonEntity } from '@authdare/common/base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StringValidator } from '@authdare/common/validation';
import { IsBoolean, IsEmail, IsOptional } from 'class-validator';
import { arrayTransformer, jsonTransformer } from '@authdare/common/util';
import { ApiProperty } from '@nestjs/swagger';

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
    @IsOptional()
    @Column()
    html?: string;

    @StringValidator()
    @IsOptional()
    @Column()
    text?: string;

    @IsOptional()
    @Column({ type: 'text', transformer: arrayTransformer() })
    placeholders?: string[];
}

@Entity({ name: 'mails', synchronize: true })
export class MailEntity extends CommonEntity<MailEntity> {
    @StringValidator({ max: 50 })
    @IsEmail()
    @Column()
    to?: string;
    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    @Column({ default: false })
    sent?: boolean;
    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    @Column({ default: false })
    read?: boolean;

    /**
     * The data to be sent to the template
     *
     **/
    @ApiProperty()
    @IsOptional()
    @Column({
        nullable: true,
        type: 'text',
        transformer: jsonTransformer(),
    })
    context?: string;

    @ApiProperty({ default: {} })
    @ManyToOne(() => MailTemplatesEntity, (template) => template.name, { eager: true })
    @JoinColumn()
    template?: string;
}
