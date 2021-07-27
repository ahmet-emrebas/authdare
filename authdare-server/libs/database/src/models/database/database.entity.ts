import { JoinColumn } from 'typeorm';
import { EntityBase } from './../base/base';
import { Entity, OneToOne } from 'typeorm';
import { Column } from 'typeorm';
import { OrgEntity } from '../org';


@Entity({ name: 'databases' })
export class DatabaseEntity extends EntityBase<DatabaseEntity>  {
    static readonly className = "DatabaseEntity";
    @Column() name: string;
    @Column() type: string;
    @Column({ default: `authdare_db_${Date.now()}.sqlite` }) database: string;
    @Column({ nullable: true }) host: string;
    @Column({ nullable: true }) port: number;
    @Column({ nullable: true }) username: string;
    @Column({ nullable: true }) password: string;

    @OneToOne(() => OrgEntity, org => org.database)
    @JoinColumn()
    org: OrgEntity;
}

