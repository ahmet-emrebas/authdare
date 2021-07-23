import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { BaseDto } from '@authdare/core';

@Exclude()
export class CreateProjectDto extends BaseDto<CreateProjectDto> {
    @Expose() @ApiProperty({}) projectName: string;
    @Expose() @ApiProperty({}) description: string;
    @Expose() @ApiProperty({}) due: string;
}