import { PartialType } from '@nestjs/swagger';
import { CreateAuthDTO } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDTO) { }
