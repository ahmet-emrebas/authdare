import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '@authdare/core';
import { Exclude, Expose } from 'class-transformer';


@Exclude()
export class CreateCategoryDto extends BaseEntity<CreateCategoryDto> {
    @Expose() @ApiProperty() category: string;
}