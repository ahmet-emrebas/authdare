import { ApiProperty } from '@nestjs/swagger';
import { CommonEntity } from '@authdare/common/base';
import { Exclude, Expose } from 'class-transformer';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { TableEntity } from './table.entity';

@Entity()
@Exclude()
export class DatabaseEntity extends CommonEntity<DatabaseEntity> {
    @ApiProperty()
    @Expose()
    @Column({ unique: true })
    name?: string;

    @ApiProperty()
    @Expose()
    @Column()
    type?: string;

    @ApiProperty()
    @Expose()
    @Column({ nullable: true })
    url?: string;

    @ApiProperty()
    @Expose()
    @Column({ nullable: true })
    database?: string;

    @ApiProperty()
    @Expose()
    @Column({ nullable: true })
    username?: string;

    @ApiProperty()
    @Expose()
    @Column({ nullable: true })
    password?: string;

    @ApiProperty()
    @Expose()
    @ManyToMany(() => TableEntity, (table) => table.id, {
        eager: true,
        cascade: true,
        createForeignKeyConstraints: true,
    })
    @JoinTable({ name: 'database_tables' })
    tables?: TableEntity[];
}
