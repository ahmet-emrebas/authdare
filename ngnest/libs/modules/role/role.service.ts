import { Repository } from 'typeorm';
import {
    CreateRoleDto, Role,
    UpdateRoleDto
} from '@authdare/models';
import { BaseResourceService } from '@authdare/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService extends BaseResourceService<Role, CreateRoleDto, UpdateRoleDto> {
    constructor(@InjectRepository(Role) roleRepo: Repository<Role>) {
        super(roleRepo, CreateRoleDto, UpdateRoleDto)
    }
}