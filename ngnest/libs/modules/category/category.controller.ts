import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '@authdare/models';
import {
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  Controller,
} from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('CategoryController')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @Post()
  async create(@Body() creaetDto: CreateCategoryDto) {
    return await this.categoryService.save(creaetDto);
  }

  @ApiOkResponse()
  @Get()
  async findAll(@Query() query: FindManyOptions) {
    return await this.categoryService.find(query);
  }

  @ApiOkResponse()
  @Post('query')
  async findAllQuery(@Body() query: FindManyOptions) {
    return await this.categoryService.find(query);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.find({ where: { id } });
  }

  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @ApiNotFoundResponse()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateCategoryDto) {
    return await this.categoryService.update(id, updateDto);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.categoryService.delete(id);
  }
}
