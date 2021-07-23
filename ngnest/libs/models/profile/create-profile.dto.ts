import { BaseDto } from '@authdare/core';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';


@Exclude()
export class CreateProfileDto extends BaseDto<CreateProfileDto> {
    @Expose()
    @ApiProperty({
        type: 'text',
        default: { id: 1 },
        nullable: true,
        required: false,
    })
    @IsString()
    photos: { id: number | string }[];
}