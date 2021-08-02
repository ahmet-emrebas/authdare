import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';
import { BaseValidator } from './base.entity';

export class Login extends BaseValidator<Login> {
  @ApiProperty({ default: 'aemrebas.dev@gmail.com' }) @IsEmail() email!: string;
  @ApiProperty({ default: 'myPassword' }) @Length(6, 50) password!: string;
  constructor(obj?: Login) {
    super(obj);
  }
}
