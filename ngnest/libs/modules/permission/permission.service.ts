import { Repository } from 'typeorm';
import {
  CreatePermissionDto,
  Permission,
  UpdatePermissionDto,
} from '@authdare/models';
import { BaseResourceService } from '@authdare/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionService extends BaseResourceService<
  Permission,
  CreatePermissionDto,
  UpdatePermissionDto
> {
  constructor(
    @InjectRepository(Permission) permissionRepo: Repository<Permission>
  ) {
    super(permissionRepo, CreatePermissionDto, UpdatePermissionDto);
  }
}
