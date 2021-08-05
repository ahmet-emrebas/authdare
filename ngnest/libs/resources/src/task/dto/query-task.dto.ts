import { BaseClass, } from '@authdare/objects';
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { TLikeContains } from '@authdare/utils';

@Exclude()
export class QueryTaskDTO extends BaseClass<QueryTaskDTO> {

    @Expose() @ApiProperty({ default: "t - - " })
    @TLikeContains()
    readonly title!: string;

    @Expose() @ApiProperty({ default: "t - - " })
    @TLikeContains()
    readonly description!: string;
}