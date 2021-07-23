import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto } from '@authdare/models';
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

@ApiTags('ProjectController')
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @Post()
  async create(@Body() creaetDto: CreateProjectDto) {
    return await this.projectService.save(creaetDto);
  }

  @ApiOkResponse()
  @Get()
  async findAll(@Query() query: FindManyOptions) {
    return await this.projectService.find(query);
  }

  @ApiOkResponse()
  @Post('query')
  async findAllQuery(@Body() query: FindManyOptions) {
    return await this.projectService.find(query);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.projectService.find({ where: { id } });
  }

  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @ApiNotFoundResponse()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateProjectDto) {
    return await this.projectService.update(id, updateDto);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.projectService.delete(id);
  }
}
