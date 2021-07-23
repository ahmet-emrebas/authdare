import { CreateProductDto } from './create-product.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  constructor(values?: UpdateProductDto) {
    super();
    Object.assign(this, values);
  }
}
