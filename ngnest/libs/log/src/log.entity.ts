import { CommonEntity } from '@authdare/common/class';
import { Column, Entity } from 'typeorm';
import { StringValidator } from '@authdare/common/decorator';
import { IsNumber } from 'class-validator';

@Entity({ name: 'logs' })
export class LogEntity extends CommonEntity<LogEntity> {
    @StringValidator()
    @Column()
    target?: string;

    @IsNumber()
    @Column()
    code?: number;

    @StringValidator()
    @Column({ nullable: true })
    message?: string;
}
