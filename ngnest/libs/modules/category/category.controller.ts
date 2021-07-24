import { QueryOptions } from './../../core/src/controller/query-options';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto, Category } from '@authdare/models';
import {
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  Controller,
  Logger,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('CategoryController')
@Controller('categorys')
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @Post()
  async create(@Body() creaetDto: CreateCategoryDto) {
    try {
      return await this.categoryService.save(creaetDto);
    } catch (err) {
      Logger.error(err, CategoryController.name);
      return err;
    }
  }

  @ApiOkResponse()
  @Get()
  async findAll(@Query() query: QueryOptions<Category>) {
    try {
      return await this.categoryService.find(query);
    } catch (err) {
      Logger.error(err);
      return err;
    }
  }

  @ApiOkResponse()
  @Post('query')
  async findAllQuery(@Body() query: QueryOptions<Category>) {
    try {
      return await this.categoryService.find(query);
    } catch (err) {
      Logger.error(err);
      return err;
    }
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.categoryService.find({ where: { id } });
    } catch (err) {
      Logger.error(err);
      return err;
    }
  }

  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @ApiNotFoundResponse()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateCategoryDto) {
    try {
      return await this.categoryService.update(id, updateDto);
    } catch (err) {
      Logger.error(err);
      return err;
    }
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.categoryService.delete(id);
    } catch (err) {
      Logger.error(err);
      return err;
    }
  }
}
