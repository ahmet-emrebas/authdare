import { BaseEntity } from '@authdare/base';
import { Column, Entity } from "typeorm";

@Entity({ name: 'orgs' })
export class OrgEntity extends BaseEntity<OrgEntity> {
    static className = "OrgEntity";

    @Column({ unique: true }) name: string;

}