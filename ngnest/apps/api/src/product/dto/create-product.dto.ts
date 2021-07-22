import { BaseDto } from '@authdare/core'
import { Length } from 'class-validator';

export class CreateProductDto extends BaseDto<CreateProductDto>{

    @Length(3, 5)
    firstName: string;

    constructor(values: CreateProductDto) {
        super(values);
    }
}
