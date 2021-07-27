import { JoinColumn } from 'typeorm';
import { BaseEntity } from './../base/base';
import { Entity, OneToOne } from 'typeorm';
import { Column } from 'typeorm';
import { Org } from '../org';


@Entity()
export class Database extends BaseEntity<Database>  {
    @Column() name: string;
    @Column() type: string;
    @Column({ default: `authdare_db_${Date.now()}.sqlite` }) database: string;
    @Column({ nullable: true }) host: string;
    @Column({ nullable: true }) port: number;
    @Column({ nullable: true }) username: string;
    @Column({ nullable: true }) password: string;

    @OneToOne(() => Org, org => org.database)
    @JoinColumn()
    org: Org;
}
