import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsOptional, IsString, Min } from 'class-validator';

@Exclude()
export class QueryOptions<T = any> {
    @ApiProperty({ required: false, default: 0 })
    @Expose()
    @Transform(({ value }) => parseInt(value) || 0)
    @Min(0)
    @IsOptional()
    take: number;

    @ApiProperty({ required: false, default: 0 })
    @Expose()
    @Transform(({ value }) => parseInt(value) || 0)
    @IsOptional()
    @Min(0)
    skip: number;

    @ApiProperty({ required: false })
    @Expose()
    @Transform(({ value }) => {
        return value && typeof value == 'string' && value.split(',') || value
    }, { toClassOnly: true })
    @IsString({ each: true })
    @IsOptional()
    select: (keyof T)[]

    constructor(obj: QueryOptions) {
        Object.assign(this, obj);
    }
}