import { Length } from 'class-validator';
import { BaseDto } from '@authdare/core';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateApplianceDto extends BaseDto<CreateApplianceDto> {
  @Expose()
  @ApiProperty({ type: 'string', maxLength: 50, minLength: 1 })
  @Length(1, 50)
  applianceName: string;

  @Expose()
  @ApiProperty({ nullable: true })
  condition: string;
}
