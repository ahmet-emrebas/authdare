import { BaseResourceService } from '@authdare/base';
import {
  CreatePermissionDTO,
  UpdatePermissionDTO,
  PermissionEntity,
} from '@authdare/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService extends BaseResourceService<
PermissionEntity,
CreatePermissionDTO,
UpdatePermissionDTO
> {
  static readonly className = 'PermissionService';
  constructor(
    @InjectRepository(PermissionEntity) repo: Repository<PermissionEntity>,
  ) {
    super(repo);
  }
}
