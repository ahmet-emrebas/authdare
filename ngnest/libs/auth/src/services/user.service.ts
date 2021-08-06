import { UpdateUserDTO } from '../sub/dto/update-user.dto';
import { CreateUserDTO } from '@authdare/auth/sub';
import { BaseResourceService } from '@authdare/objects';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../sub';

@Injectable()
export class UserService extends BaseResourceService<UserEntity, CreateUserDTO, UpdateUserDTO> {
    constructor(@InjectRepository(UserEntity) authUserRepository: Repository<UserEntity>) {
        super(authUserRepository, new Logger(UserService.name));
    }

    async isExistByEmail(email: string) {
        return await this.isExist({ where: { email } })
    }
}
