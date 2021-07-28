import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO, UpdateUserDTO, UserEntity } from '@authdare/models';
import { BaseController } from '@authdare/base';

@ApiTags(UserResourceController.name)
@Controller("users")
export class UserResourceController
    extends BaseController<UserEntity, CreateUserDTO, UpdateUserDTO> {
    static className = 'UserResourceController'
}

