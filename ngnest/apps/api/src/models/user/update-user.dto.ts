import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  constructor(values?: UpdateUserDto) {
    super();
    Object.assign(this, values);
  }
}
