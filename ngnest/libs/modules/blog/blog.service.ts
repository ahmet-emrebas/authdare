import { Repository } from 'typeorm';
import { CreateBlogDto, Blog, UpdateBlogDto } from '@authdare/models';
import { BaseResourceService } from '@authdare/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BlogService extends BaseResourceService<
  Blog,
  CreateBlogDto,
  UpdateBlogDto
> {
  constructor(@InjectRepository(Blog) blogRepo: Repository<Blog>) {
    super(blogRepo, CreateBlogDto, UpdateBlogDto);
  }
}
