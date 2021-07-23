import { BaseDto } from '@authdare/core';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateTagDto extends BaseDto<CreateTagDto>{
    @Expose()
    @ApiProperty()
    tag: string;
}