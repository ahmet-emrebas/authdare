import { resourcePath } from '@authdare/base/controller';
import { permissionString, SetPermission } from '@authdare/base/decorator';
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAuthDTO, QueryAuthDTO, TransformAndValidateQueryAuthPipe, UpdateAuthDto, TransformAndValidateCreateAuthPipe } from './dto';
import { AuthService } from './auth.service';

const RESOURCE_PATH = 'auths';

@ApiTags(AuthController.name)
@Controller(resourcePath(RESOURCE_PATH))
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @SetPermission(permissionString('post', RESOURCE_PATH))
  @Post()
  create(@Body(TransformAndValidateCreateAuthPipe) createAuthDto: CreateAuthDTO) {
    return this.authService.create(createAuthDto);
  }

  @SetPermission(permissionString('get', RESOURCE_PATH))
  @Get()
  async findAll(@Query(TransformAndValidateQueryAuthPipe) query: QueryAuthDTO) {
    return await this.authService.find(query)
  }

  @SetPermission(permissionString('get', RESOURCE_PATH))
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.authService.findOne(id);
  }

  @SetPermission(permissionString('update', RESOURCE_PATH))
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }

  @SetPermission(permissionString('delete', RESOURCE_PATH))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.authService.softDelete(id);
  }


}
