import { Controller, UseGuards } from '@nestjs/common';
import { UserEntity } from '@authdare/models';
import { ResourceController } from '@authdare/resources';
import { AuthGuard } from '@authdare/auth';

@Controller('api/:resource')
@UseGuards(AuthGuard)
export class AppResourceController extends ResourceController<UserEntity> { }