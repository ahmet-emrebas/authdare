import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';
import { BaseValidator } from './base.entity';
import { Trim } from './transformers';

export class Login extends BaseValidator<Login> {
  @ApiProperty({ default: 'aemrebas.dev@gmail.com' })
  @Trim()
  @IsEmail()
  email?: string;

  @ApiProperty({ default: 'myPassword' })
  @Trim()
  @Length(6, 50)
  password?: string;

  constructor(obj?: Login) { super(obj); }
}
