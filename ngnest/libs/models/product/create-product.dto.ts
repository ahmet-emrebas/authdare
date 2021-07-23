import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@authdare/core';
import { Exclude, Expose } from "class-transformer";


@Exclude()
export class CreateProductDto extends BaseDto<CreateProductDto>{
    @Expose() @ApiProperty({ type: 'string' }) brand: string;
    @Expose() @ApiProperty({ type: 'string' }) productname: string;
    @Expose() @ApiProperty({ type: 'string' }) description: string;
    @Expose() @ApiProperty({ type: 'string' }) details: string;
    @Expose() @ApiProperty({ type: 'number' }) price: number;
    @Expose() @ApiProperty({ default: { id: 1 } }) organization: { id: number | string };
    @Expose() @ApiProperty({ default: [{ id: 1 }, { id: 2 }] }) categories: { id: number | string }[];
    @Expose() @ApiProperty({ default: [{ id: 1 }, { id: 2 }] }) photos: { id: number | string }[];
}

