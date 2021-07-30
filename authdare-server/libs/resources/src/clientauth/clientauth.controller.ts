import { resourcePath } from '@authdare/base/controller';
import { permissionString, SetPermission } from '@authdare/base/decorator';
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateClientauthDTO, QueryClientauthDTO, TransformAndValidateQueryClientauthPipe, UpdateClientauthDto, TransformAndValidateCreateClientauthPipe } from './dto';
import { ClientauthService } from './clientauth.service';

const RESOURCE_PATH = 'auths';

@ApiTags(ClientauthController.name)
@Controller(resourcePath(RESOURCE_PATH))
export class ClientauthController {
  constructor(private readonly clientauthService: ClientauthService) { }

  @SetPermission(permissionString('post', RESOURCE_PATH))
  @Post()
  create(@Body(TransformAndValidateCreateClientauthPipe) createClientauthDto: CreateClientauthDTO) {
    return this.clientauthService.create(createClientauthDto);
  }

  @SetPermission(permissionString('get', RESOURCE_PATH))
  @Get()
  async findAll(@Query(TransformAndValidateQueryClientauthPipe) query: QueryClientauthDTO) {
    return await this.clientauthService.find(query)
  }

  @SetPermission(permissionString('get', RESOURCE_PATH))
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.clientauthService.findOne(id);
  }

  @SetPermission(permissionString('update', RESOURCE_PATH))
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateClientauthDto: UpdateClientauthDto) {
    return this.clientauthService.update(id, updateClientauthDto);
  }

  @SetPermission(permissionString('delete', RESOURCE_PATH))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientauthService.softDelete(id);
  }


}
