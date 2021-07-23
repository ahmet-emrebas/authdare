import { CreateProjectDto } from './../project/create-project.dto';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@authdare/core';

@Exclude()
export class CreateSprintDto extends BaseDto<CreateSprintDto>{

    @Expose() @ApiProperty({}) sprintName: string;
    @Expose() @ApiProperty({}) description: string;
    @Expose() @ApiProperty({ default: { id: 1 } }) project: { id: number | string };

}