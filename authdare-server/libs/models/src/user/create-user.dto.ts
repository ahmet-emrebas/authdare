import { CreateOrgDto } from './../org';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'aemrebas.dev@gmail.com' }) email: string;
  @ApiProperty({ default: 'aemrebas.dev@gmail.com' }) password: string;
  @ApiProperty({ default: { name: 'aemrebas.dev@gmail.com' } })
  org: CreateOrgDto;
}
