import { CreatePhotoDto } from '@authdare/models';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto, RelationID } from '@authdare/core';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmptyObject, MaxLength } from 'class-validator';

@Exclude()
export class CreateProfileDto extends BaseDto<CreateProfileDto> {
  @Expose()
  @ApiProperty({ type: 'string', nullable: true, maxLength: 50 })
  @MaxLength(50)
  nickname: string;

  @Expose()
  @ApiProperty({ nullable: false, default: { id: 1 } })
  @IsNotEmptyObject()
  user: RelationID;
}
