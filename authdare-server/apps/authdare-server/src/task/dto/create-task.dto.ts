import { BaseDTO } from '@authdare/base';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateTaskDTO extends BaseDTO<CreateTaskDTO> {
    @ApiProperty({ default: 'name' }) @IsString() @MaxLength(50) name: string;
    @ApiProperty({ default: 'description' }) @IsString() @MaxLength(300) description: string;
    @ApiProperty({ default: new Date().toUTCString() }) due: string;
}