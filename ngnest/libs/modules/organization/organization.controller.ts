import { OrganizationService } from './organization.service';
import { CreateOrganizationDto, UpdateOrganizationDto } from '@authdare/models';
import { Post, Body, Get, Patch, Delete, Param, Query, Controller } from "@nestjs/common";
import { FindManyOptions } from 'typeorm'
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';


@ApiTags('OrganizationController')
@Controller('organizations')
export class OrganizationController {
    constructor(private organizationService: OrganizationService) { }

    @ApiCreatedResponse()
    @ApiUnprocessableEntityResponse()
    @Post()
    async create(@Body() creaetDto: CreateOrganizationDto,) {
        return await this.organizationService.save(creaetDto);
    }

    @ApiOkResponse()
    @Get()
    async findAll(@Query() query: FindManyOptions) {
        return await this.organizationService.find(query);
    }

    @ApiOkResponse()
    @Post('query')
    async findAllQuery(@Body() query: FindManyOptions) {
        return await this.organizationService.find(query);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.organizationService.find({ where: { id } });
    }


    @ApiCreatedResponse()
    @ApiUnprocessableEntityResponse()
    @ApiNotFoundResponse()
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateDto: UpdateOrganizationDto) {
        return await this.organizationService.update(id, updateDto);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.organizationService.delete(id);
    }
}