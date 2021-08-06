import { UpdateAuthUserDTO } from './sub/dto/update-auth-user.dto';
import { CreateAuthUserDTO } from '@authdare/auth/sub';
import { BaseResourceService } from '@authdare/objects';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUserEntity } from './sub';

@Injectable()
export class AuthUserService extends BaseResourceService<AuthUserEntity, CreateAuthUserDTO, UpdateAuthUserDTO> {
    constructor(@InjectRepository(AuthUserEntity) authUserRepository: Repository<AuthUserEntity>) {
        super(authUserRepository, new Logger(AuthUserService.name));
    }
}
