import { TagService } from './tag.service';
import { CreateTagDto, UpdateTagDto } from '@authdare/models';
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

@ApiTags('TagController')
@Controller('tags')
export class TagController {
  constructor(private tagService: TagService) {}

  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @Post()
  async create(@Body() creaetDto: CreateTagDto) {
    return await this.tagService.save(creaetDto);
  }

  @ApiOkResponse()
  @Get()
  async findAll(@Query() query: FindManyOptions) {
    return await this.tagService.find(query);
  }

  @ApiOkResponse()
  @Post('query')
  async findAllQuery(@Body() query: FindManyOptions) {
    return await this.tagService.find(query);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tagService.find({ where: { id } });
  }

  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @ApiNotFoundResponse()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateTagDto) {
    return await this.tagService.update(id, updateDto);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tagService.delete(id);
  }
}
