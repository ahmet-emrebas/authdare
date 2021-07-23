import { PartialType } from '@nestjs/swagger';
import { CreateBlogContentDto, CreateBlogDto } from './create-blog.dto';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  constructor(values?: UpdateBlogDto) {
    super();
    Object.assign(this, values);
  }
}

export class UpdateBlogContentDto extends PartialType(CreateBlogContentDto) {
  constructor(values?: UpdateBlogDto) {
    super();
    Object.assign(this, values);
  }
}
