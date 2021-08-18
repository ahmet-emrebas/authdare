import { Exclude, Expose } from 'class-transformer';
import { CommonEntity } from '@authdare/common/base';
import { Entity, Column, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TableEntity } from './table.entity';

@Entity({ name: 'columns' })
@Exclude()
export class ColumnEntity extends CommonEntity<ColumnEntity> {
    @ApiProperty({ nullable: true })
    @Expose()
    @Column({ unique: true })
    name?: string;

    @ApiProperty({ nullable: true })
    @Expose()
    @Column()
    type?: string;

    @ApiProperty({ nullable: true })
    @Expose()
    @Column({ type: 'boolean', default: false })
    nullable?: boolean;

    @ApiProperty({ nullable: true })
    @Expose()
    @Column({ type: 'boolean', default: false })
    unique?: boolean;

    @ApiProperty({ nullable: true })
    @Expose()
    @Column({ type: 'text', nullable: true })
    transformer?: 'toJson' | 'toArray';

    @ManyToMany(() => TableEntity, (table) => table.columns)
    tables?: TableEntity[];
}
