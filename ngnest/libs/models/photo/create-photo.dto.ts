import { BaseDto } from '@authdare/core';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, Length, MaxLength } from 'class-validator';

@Exclude()
export class CreatePhotoDto extends BaseDto<CreatePhotoDto> {
  @Expose()
  @ApiProperty({
    type: 'string',
    minLength: 5,
    maxLength: 200,
    nullable: false,
    required: true,
  })
  @Length(5, 200)
  @IsNotEmpty()
  photo: string;

  @Expose()
  @ApiProperty({ type: 'string', maxLength: 20, nullable: true })
  @MaxLength(20)
  position: string;
}
