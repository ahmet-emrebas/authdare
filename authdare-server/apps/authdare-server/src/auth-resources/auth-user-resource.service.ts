import { ResourceService } from '@authdare/core';
import { User } from '@authdare/models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class AuthUserResourceService extends ResourceService<User>{
  constructor(@InjectRepository(User) userRepo: Repository<User>) {
    super(userRepo);
  }
}
