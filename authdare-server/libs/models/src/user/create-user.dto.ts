import { CreateRoleDTO } from './../role/create-role.dto';
import { internet } from 'faker';
import { BaseDTO } from '@authdare/base';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { CreateOrgDTO } from '../org';

@Exclude()
export class CreateUserDTO extends BaseDTO<CreateUserDTO> {
  static readonly className = 'CreateUserDTO';

  @Expose()
  @ApiProperty({ default: internet.email(), required: true })
  @IsEmail()
  email?: string;

  @Expose()
  @ApiProperty({ default: internet.password(), required: true })
  @IsNotEmpty()
  @MaxLength(300)
  password?: string;

  @Expose()
  @ApiProperty({ default: { id: 1 } })
  org?: Partial<CreateOrgDTO>;


  @Expose()
  @ApiProperty({ default: [], required: true })
  roles?: Partial<CreateRoleDTO>[];
}
