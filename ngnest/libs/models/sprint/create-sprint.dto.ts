import { CreateProjectDto } from './../project/create-project.dto';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto, RelationID } from '@authdare/core';
import { IsNotEmpty, Length, MaxLength } from 'class-validator';

@Exclude()
export class CreateSprintDto extends BaseDto<CreateSprintDto> {
  @Expose()
  @ApiProperty({
    type: 'string',
    required: true,
    nullable: false,
    maxLength: 50,
    minLength: 1,
  })
  @IsNotEmpty()
  @Length(1, 50)
  sprintName: string;

  @Expose()
  @ApiProperty({
    type: 'string',
    maxLength: 400,
    nullable: true,
  })
  @MaxLength(400)
  description: string;

  @Expose()
  @ApiProperty({ required: true, nullable: false, default: { id: 1 } })
  project: RelationID;
}
