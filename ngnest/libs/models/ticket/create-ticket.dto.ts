import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto, RelationID } from '@authdare/core';
import { IsNotEmptyObject } from 'class-validator';

@Exclude()
export class CreateTicketDto extends BaseDto<CreateTicketDto> {
  @Expose()
  @ApiProperty({
    type: 'string',
    maxLength: 50,
    minLength: 3,
    default: 'ticket name',
  })
  ticketName: string;

  @Expose()
  @ApiProperty({
    type: 'string',
    nullable: true,
    default: 'description of the ticket ',
  })
  description: string;

  @Expose()
  @ApiProperty({
    type: 'string',
    nullable: true,
    default: '10/10/2050 14:30 PM',
  })
  due: string;

  @Expose()
  @ApiProperty({
    type: 'string',
    nullable: true,
    default: 'undefined',
  })
  status: string;

  @Expose()
  @ApiProperty({
    nullable: true,
    default: [{ id: 1 }, { id: 2 }],
  })
  categories: RelationID[];

  @Expose()
  @ApiProperty({
    default: { id: 1 },
    required: true,
    nullable: false,
  })
  @IsNotEmptyObject()
  createdBy: RelationID;

  @Expose()
  @ApiProperty({
    default: [{ id: 1 }, { id: 2 }],
    nullable: true,
  })
  assignedTo: RelationID[];
}
