import { BaseResourceService } from '@authdare/base';
import { CreateRoleDTO, UpdateRoleDTO, RoleEntity } from '@authdare/models';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class RoleService extends BaseResourceService<RoleEntity, CreateRoleDTO, UpdateRoleDTO>{
    static readonly className = 'RoleService';
    constructor(@InjectRepository(RoleEntity) repo: Repository<RoleEntity>) {
        super(repo, CreateRoleDTO, UpdateRoleDTO);
    }
}