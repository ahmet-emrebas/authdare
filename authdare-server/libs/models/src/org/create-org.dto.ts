import { Length } from 'class-validator';
import { BaseDto } from './../base/base';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateOrgDto extends BaseDto<CreateOrgDto>{
  @ApiProperty({ default: 'aemrebas.dev@gmail.com' }) @Length(3, 20) name: string;
}


export class UdpateOrgDto extends PartialType(CreateOrgDto) { }