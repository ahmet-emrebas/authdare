import { Injectable, Logger } from '@nestjs/common';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@authdare/auth/user/entity/user.entity';
import { BaseResourceService } from '@authdare/database';
import { Repository } from 'typeorm';

/**
 * User repository wrapper
 */
@Injectable()
export class UserService extends BaseResourceService<
    UserEntity,
    CreateUserDTO,
    UpdateUserDTO
> {
    constructor(@InjectRepository(UserEntity) __repository: Repository<UserEntity>) {
        super(__repository, new Logger(UserService.name));
    }
}
