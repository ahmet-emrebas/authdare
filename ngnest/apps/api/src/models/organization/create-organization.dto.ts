import { Expose, Exclude } from 'class-transformer';
import { BaseDto } from './../../common';
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

@Exclude()
export class CreateOrganizationDto extends BaseDto<CreateOrganizationDto> {
  @Expose()
  @ApiProperty({
    type: 'string',
    maxLength: 50,
    minLength: 1,
    nullable: false,
    required: true,
    default: 'authdare',
  })
  @Length(1, 50)
  organizationName: string;
}
