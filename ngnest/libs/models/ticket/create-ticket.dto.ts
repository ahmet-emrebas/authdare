import { Category, User } from '@authdare/models';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@authdare/core';
import { IsObject, ValidateNested, } from 'class-validator';
import { } from 'faker'

@Exclude()
export class CreateTicketDto extends BaseDto<CreateTicketDto>{

    @Expose()
    @ApiProperty({ type: 'string', maxLength: 50, minLength: 3, default: 'ticket name' })
    ticketName: string;

    @Expose()
    @ApiProperty({ type: 'string' })
    description: string;

    @Expose()
    @ApiProperty({ type: 'string' })
    due: string;


    @Expose()
    @ApiProperty({})
    @IsObject()
    @ValidateNested()
    @Type(() => Category)
    category: Category;


    @Expose()
    @ApiProperty({
        default: { "id": 1 }
    })
    createdBy: User;


    @Expose()
    @ApiProperty({
        default: [{ "id": 1 }, { "id": 2 }]
    })
    assignedTo: {}[]
}