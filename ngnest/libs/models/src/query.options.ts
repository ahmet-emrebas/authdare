import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base/base.entity';
import { Groups } from './groups';
import { ParseInt } from './transformers';
import { values, without } from 'lodash';

@Exclude()
export class QueryOptions<T extends object> extends BaseEntity<T> {

    @Expose({ groups: [Groups.QUERY] })
    @ApiProperty({ default: 0, required: false })
    @IsOptional({ groups: without(values(Groups)) })
    @IsNumber({}, { groups: [Groups.QUERY] })
    @ParseInt()
    skip?: number;

    @Expose({ groups: [Groups.QUERY] })
    @ApiProperty({ default: 0, required: false })
    @IsOptional({ groups: without(values(Groups)) })
    @IsNumber({}, { groups: [Groups.QUERY] })
    @ParseInt()
    take?: number;

    // @Expose()
    // @ApiProperty({ default: 'a,b,c', required: false })
    // @IsOptional({ groups: without(values(Groups)) })
    // @Split(',')
    // @IsString({ each: true })
    // select?: string[];

    // @Expose({ groups: [Groups.QUERY] })
    // @ApiProperty({ default: 'a,b,c', required: false })
    // @IsOptional({ groups: without(values(Groups)) })
    // @Split(',')
    // @IsString({ each: true, groups: [Groups.QUERY] })
    // relations?: string[];

}