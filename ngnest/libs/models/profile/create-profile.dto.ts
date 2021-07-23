import { BaseDto } from '@authdare/core';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';


@Exclude()
export class CreateProfileDto extends BaseDto<CreateProfileDto> {
    @Expose() @ApiProperty() photo: string;
}