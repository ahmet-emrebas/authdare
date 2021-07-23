import { Repository } from 'typeorm';
import { CreateUserDto, User, UpdateUserDto } from '@authdare/models';
import { BaseResourceService } from '@authdare/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService extends BaseResourceService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(@InjectRepository(User) userRepo: Repository<User>) {
    super(userRepo, CreateUserDto, UpdateUserDto);
  }
}
