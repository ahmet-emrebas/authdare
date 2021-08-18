import { Exclude, Expose, Transform } from 'class-transformer';
import { CommonEntity } from '@authdare/common/base';
import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { DatabaseEntity } from './database.entity';
import { ColumnEntity } from './column.entity';

@Entity({ name: 'tables' })
@Exclude()
export class TableEntity extends CommonEntity<ColumnEntity> {
    @ApiProperty()
    @Expose()
    @Column({ unique: true })
    name?: string;

    @ApiProperty()
    @Expose()
    @Column({ unique: true })
    tableName?: string;

    @ApiProperty()
    @Expose()
    @ManyToMany(() => ColumnEntity, (col) => col.id, {
        eager: true,
        cascade: true,
        createForeignKeyConstraints: true,
    })
    @JoinTable({ name: 'table_columns' })
    @Transform(({ value }) => {
        return value && value.length > 0
            ? value.map((e: any) => ({ [e.name]: e })).reduce((p: any, c: any) => ({ ...p, ...c }))
            : {};
    })
    columns?: ColumnEntity[];

    @ApiProperty()
    @Expose()
    @ManyToMany(() => DatabaseEntity, (database) => database.tables)
    databases?: DatabaseEntity[];
}
