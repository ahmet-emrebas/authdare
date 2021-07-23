import { BlogService } from './blog.service';
import { CreateBlogDto, UpdateBlogDto } from '@authdare/models';
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

@ApiTags('BlogController')
@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @Post()
  async create(@Body() creaetDto: CreateBlogDto) {
    return await this.blogService.save(creaetDto);
  }

  @ApiOkResponse()
  @Get()
  async findAll(@Query() query: FindManyOptions) {
    return await this.blogService.find(query);
  }

  @ApiOkResponse()
  @Post('query')
  async findAllQuery(@Body() query: FindManyOptions) {
    return await this.blogService.find(query);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.blogService.find({ where: { id } });
  }

  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @ApiNotFoundResponse()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateBlogDto) {
    return await this.blogService.update(id, updateDto);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.blogService.delete(id);
  }
}
