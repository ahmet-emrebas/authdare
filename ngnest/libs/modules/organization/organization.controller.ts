import { QueryOptions } from './../../core/src/controller/query-options';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto, UpdateOrganizationDto, Organization } from '@authdare/models';
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

@ApiTags('OrganizationController')
@Controller('organizations')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) { }

  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @Post()
  async create(@Body() creaetDto: CreateOrganizationDto) {
    try {
      return await this.organizationService.save(creaetDto);
    } catch (err) {
      Logger.error(err, OrganizationController.name);
      return err;
    }
  }

  @ApiOkResponse()
  @Get()
  async findAll(@Query() query: QueryOptions<Organization>) {
    try {
      return await this.organizationService.find(query);
    } catch (err) {
      Logger.error(err);
      return err;
    }
  }

  @ApiOkResponse()
  @Post('query')
  async findAllQuery(@Body() query: QueryOptions<Organization>) {
    try {
      return await this.organizationService.find(query);
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
      return await this.organizationService.find({ where: { id } });
    } catch (err) {
      Logger.error(err);
      return err;
    }
  }

  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @ApiNotFoundResponse()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateOrganizationDto) {
    try {
      return await this.organizationService.update(id, updateDto);
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
      return await this.organizationService.delete(id);
    } catch (err) {
      Logger.error(err);
      return err;
    }
  }
}
