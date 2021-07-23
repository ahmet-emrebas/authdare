import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '@authdare/core';
import { Exclude, Expose } from 'class-transformer';
import { Length } from 'class-validator';


@Exclude()
export class CreateCategoryDto extends BaseEntity<CreateCategoryDto> {
    @Expose()
    @ApiProperty({
        type: 'string',
        maxLength: 50,
        minLength: 1,
        nullable: false,
        required: true,
        default: 'technology'
    })
    @Length(1, 50)
    category: string;
}