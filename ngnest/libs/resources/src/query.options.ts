import { Transform } from 'class-transformer';
import { BaseValidator, Groups } from '@authdare/models';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryOptions extends BaseValidator<QueryOptions> {
    @ApiProperty({ default: 0 }) @IsNumber() skip?: number;
    @ApiProperty({ default: 0 }) @IsNumber() take?: number;
    @ApiProperty({ default: 'a,b,c' })
    @Transform(({ value }) => value?.split(','))
    @IsNumber() select?: string[];


}