import { BaseDto } from '@authdare/core';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';


@Exclude()
export class CreateProfileDto extends BaseDto<CreateProfileDto> {
    @Expose() @ApiProperty({
        type: 'text',
        default: '/assets/imgs/default-profile.png',
        nullable: true,
        required: false,
    })
    @IsString()
    photo: string;
}