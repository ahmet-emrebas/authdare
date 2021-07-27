import { BaseDto } from './../base/base';
import { CreateOrgDto } from './../org';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, Length, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto extends BaseDto<CreateUserDto> {
  @ApiProperty({ default: 'aemrebas.dev@gmail.com' }) @IsEmail() email: string;
  @ApiProperty({ default: 'aemrebas.dev@gmail.com' }) @Length(6, 100) password: string;


  @ApiProperty({
    default: {
      name: "authdare",
      database: {
        name: 'authdare_connection',
        type: 'postgres',
        database: 'authdare',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
      }
    }
  })
  @ValidateNested()
  @Type(() => CreateOrgDto)
  org: CreateOrgDto;
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }

