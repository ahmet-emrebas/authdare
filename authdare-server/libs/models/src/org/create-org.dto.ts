import { IsAlpha, Length } from 'class-validator';
import { BaseDto } from './../base/base';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDatabaseDto } from '../database';


export class CreateOrgDto extends BaseDto<CreateOrgDto>{
  @ApiProperty({ default: 'aemrebas.dev@gmail.com' })
  @Length(3, 20)
  @IsAlpha()
  name: string;

  @ApiProperty()
  database: CreateDatabaseDto;
}


export class UpdateOrgDto extends PartialType(CreateOrgDto) { }