import { BaseResourceService } from '@authdare/base';
import { CreateUserDTO, UpdateUserDTO, UserEntity } from '@authdare/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends BaseResourceService<
  UserEntity,
  CreateUserDTO,
  UpdateUserDTO
> {
  static readonly className = 'UserService';
  constructor(@InjectRepository(UserEntity) repo: Repository<UserEntity>) {
    super(repo, CreateUserDTO, UpdateUserDTO);
  }
}
