import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from '@resources';

export class SignupDto extends OmitType(CreateUserDto, ['permissions']) {
  constructor(obj: SignupDto) {
    super(obj);
    Object.assign(this, obj);
  }
}
