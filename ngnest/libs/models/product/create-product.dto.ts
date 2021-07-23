import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@authdare/core';
import { Exclude, Expose } from "class-transformer";


@Exclude()
export class CreateProductDto extends BaseDto<CreateProductDto>{
    @Expose() @ApiProperty() brand: string;
    @Expose() @ApiProperty() productname: string;
    @Expose() @ApiProperty() description: string;
    @Expose() @ApiProperty() details: string;
    @Expose() @ApiProperty() price: number;
    @Expose() @ApiProperty() organization: { id: number | string };
    @Expose() @ApiProperty() categories: { id: number | string }[];
}

