import { Controller } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from "./entities";
import { CreateProductDto, UpdateProductDto } from "./dto";
import { BaseController, BaseResourceService } from "@authdare/core/controller";

@Controller('products')
export class ProductController extends BaseController<Product, CreateProductDto, UpdateProductDto> {
    constructor(@InjectRepository(Product) repo: Repository<Product>) {
        super(new BaseResourceService(repo))
    }
}
