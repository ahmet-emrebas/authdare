import { resourcePath } from '@authdare/base/controller';
import { permissionString, SetPermission } from '@authdare/base/decorator';
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO, QueryUserDTO, TransformAndValidateQueryUserPipe, UpdateUserDto, TransformAndValidateCreateUserPipe } from './dto';
import { UserService } from './user.service';

const RESOURCE_PATH = 'users';

@ApiTags(UserController.name)
@Controller(resourcePath(RESOURCE_PATH))
export class UserController {
  constructor(private readonly userService: UserService) { }

  @SetPermission(permissionString('post', RESOURCE_PATH))
  @Post()
  create(@Body(TransformAndValidateCreateUserPipe) createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto);
  }

  @SetPermission(permissionString('get', RESOURCE_PATH))
  @Get()
  async findAll(@Query(TransformAndValidateQueryUserPipe) query: QueryUserDTO) {
    return await this.userService.find(query)
  }

  @SetPermission(permissionString('get', RESOURCE_PATH))
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }

  @SetPermission(permissionString('update', RESOURCE_PATH))
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @SetPermission(permissionString('delete', RESOURCE_PATH))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.softDelete(id);
  }


}
