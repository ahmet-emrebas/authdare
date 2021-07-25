import { CreatePhotoDto } from './create-photo.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdatePhotoDto extends PartialType(CreatePhotoDto) {
  constructor(values?: UpdatePhotoDto) {
    super();
    Object.assign(this, values);
  }
}
