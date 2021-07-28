import { BaseResourceService } from '@authdare/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService extends BaseResourceService<UserEntity, CreateUserDTO, UpdateUserDTO>{
    constructor(@InjectRepository(UserEntity) user: Repository<UserEntity>) {
        super(user, CreateUserDTO, UpdateUserDTO);
    }
}
