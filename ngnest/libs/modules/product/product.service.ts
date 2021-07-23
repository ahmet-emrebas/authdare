import { Repository } from 'typeorm';
import { CreateProductDto, Product, UpdateProductDto } from '@authdare/models';
import { BaseResourceService } from '@authdare/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService extends BaseResourceService<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(@InjectRepository(Product) productRepo: Repository<Product>) {
    super(productRepo, CreateProductDto, UpdateProductDto);
  }
}
