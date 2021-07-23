import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { BaseDto, RelationID } from '@authdare/core';
import { IsNotEmpty, Length, MaxLength } from 'class-validator';

@Exclude()
export class CreateProjectDto extends BaseDto<CreateProjectDto> {
  @Expose()
  @ApiProperty({
    type: 'string',
    maxLength: 50,
    minLength: 1,
    required: true,
    nullable: false,
  })
  @Length(1, 50)
  @IsNotEmpty()
  projectName: string;

  @Expose()
  @ApiProperty({
    type: 'string',
    maxLength: 400,
    nullable: true,
  })
  @MaxLength(400)
  description: string;

  @Expose()
  @ApiProperty({ type: 'string', maxLength: 30 })
  @MaxLength(20)
  due: string;

  @Expose()
  @ApiProperty({ required: true, nullable: false })
  @IsNotEmpty()
  organization: RelationID;
}
