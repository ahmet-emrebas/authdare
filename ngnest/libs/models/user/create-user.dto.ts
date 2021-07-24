import { CreateRoleDto } from './../role/create-role.dto';
import { CreateProfileDto } from '@authdare/models';
import { BaseDto, RelationID } from '@authdare/core';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';
import { name, internet, phone } from 'faker';

@Exclude()
export class CreateUserDto extends BaseDto<CreateUserDto> {
  @Expose()
  @ApiProperty({
    type: 'string',
    required: true,
    nullable: false,
    maxLength: 50,
    minLength: 1,
    default: name.firstName(),
  })
  @IsString()
  @Length(3, 50)
  firstName: string;

  @Expose()
  @ApiProperty({
    type: 'string',
    required: true,
    nullable: false,
    maxLength: 50,
    minLength: 1,
    default: name.lastName(),
  })
  @IsString()
  @Length(3, 50)
  lastName: string;

  @Expose()
  @ApiProperty({
    type: 'string',
    required: true,
    nullable: false,
    maxLength: 100,
    minLength: 6,
    default: internet.password(),
  })
  @IsString()
  @Length(6, 100)
  password: string;

  @Expose()
  @ApiProperty({
    type: 'string',
    required: true,
    nullable: false,
    default: internet.email(),
  })
  @IsEmail()
  email: string;

  @Expose()
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
    maxLength: 20,
    minLength: 10,
    default: phone.phoneNumber(),
  })
  phone: string;

  @Expose()
  @ApiProperty({
    nullable: false,
    required: true,
    default: { id: 1 },
  })
  organization: RelationID;

  @Expose()
  @ApiProperty({
    nullable: false,
    required: true,
    default: [{ id: 1 }, { id: 2 }],
  })
  roles: RelationID[];

}
