import { BaseClass } from '@authdare/objects';
import { Like } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Transform } from "class-transformer";

@Exclude()
export class QueryTaskDTO extends BaseClass<QueryTaskDTO> {

    @Expose() @ApiProperty({ default: "t - - " })
    @Transform(({ value }) => Like(`%${value}%`))
    readonly title!: string;

    @Expose() @ApiProperty({ default: "t - - " })
    @Transform(({ value }) => Like(`%${value}%`))
    readonly description!: string;
}