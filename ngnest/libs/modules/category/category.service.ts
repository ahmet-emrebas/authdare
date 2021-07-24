import { Repository } from 'typeorm';
import { CreateCategoryDto, Category, UpdateCategoryDto } from '@authdare/models';
import { BaseResourceService } from '@authdare/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService extends BaseResourceService<
  Category,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  constructor(@InjectRepository(Category) categoryRepo: Repository<Category>) {
    super(categoryRepo, CreateCategoryDto, UpdateCategoryDto);
  }
}
