import { BaseClass } from '@base';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';
import { internet } from 'faker';

export class AuthLoginDto extends BaseClass<AuthLoginDto> {
  @ApiProperty({
    name: 'email',
    required: true,
    type: 'email',
    description: 'Email',
    example: internet.email(),
  })
  @ApiProperty({
    isRequired: 'Email is required',
    email: 'Not a valid email',

    autocomplete: 'email',
    group: 1,
    groupName: 'Login',
  } as any)
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    required: true,
    type: 'password',
    description: 'Password',
    example: internet.password(),
    minLength: 6,
    maxLength: 20,
  })
  @ApiProperty({
    isRequired: 'Password is required!',
    minLengthMsg: 'Password must be at least 6 characters',
    maxLengthMsg: 'Password must be at most 20 characters',
    id: 'current-password',
    autocomplete: 'current-password',
    group: 1,
    groupName: 'Login',
  } as any)
  @Length(6, 100)
  password: string;
}
