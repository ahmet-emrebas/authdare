import { QueryOptions } from './../../core/src/controller/query-options';
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto, Project } from '@authdare/models';
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

@ApiTags('ProjectController')
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) { }

  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @Post()
  async create(@Body() creaetDto: CreateProjectDto) {
    try {
      return await this.projectService.save(creaetDto);
    } catch (err) {
      Logger.error(err, ProjectController.name);
      return err;
    }
  }

  @ApiOkResponse()
  @Get()
  async findAll(@Query() query: QueryOptions<Project>) {
    try {
      return await this.projectService.find(query);
    } catch (err) {
      Logger.error(err);
      return err;
    }
  }

  @ApiOkResponse()
  @Post('query')
  async findAllQuery(@Body() query: QueryOptions<Project>) {
    try {
      return await this.projectService.find(query);
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
      return await this.projectService.find({ where: { id } });
    } catch (err) {
      Logger.error(err);
      return err;
    }
  }

  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @ApiNotFoundResponse()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateProjectDto) {
    try {
      return await this.projectService.update(id, updateDto);
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
      return await this.projectService.delete(id);
    } catch (err) {
      Logger.error(err);
      return err;
    }
  }
}
