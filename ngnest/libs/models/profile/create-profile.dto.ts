import { ApiProperty } from '@nestjs/swagger';
import { BaseDto, RelationID } from '@authdare/core';
import { Exclude, Expose } from 'class-transformer';
import { MaxLength } from 'class-validator';

@Exclude()
export class CreateProfileDto extends BaseDto<CreateProfileDto> {
  @Expose()
  @ApiProperty({ type: 'string', nullable: true, maxLength: 50 })
  @MaxLength(50)
  nickname: string;

  @Expose()
  @ApiProperty({
    maxItems: 100,
    nullable: true,
    default: [{ id: 1 }, { id: 2 }],
  })
  @MaxLength(100)
  photos: RelationID[];
}
