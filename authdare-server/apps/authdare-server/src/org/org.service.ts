import { BaseResourceService } from '@authdare/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrgDTO, UpdateOrgDTO } from './dto/';
import { OrgEntity } from './entity';

@Injectable()
export class OrgService extends BaseResourceService<OrgEntity, CreateOrgDTO, UpdateOrgDTO>{
    constructor(@InjectRepository(OrgEntity) org: Repository<OrgEntity>) {
        super(org, CreateOrgDTO, UpdateOrgDTO);
    }
}
