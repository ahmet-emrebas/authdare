import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO, QueryUserDTO, TransformAndValidateQueryUserPipe, UpdateUserDto, TransformAndValidateCreateUserPipe } from './dto';
import { UserService } from './user.service';

@ApiTags(UserController.name)
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body(TransformAndValidateCreateUserPipe) createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(@Query(TransformAndValidateQueryUserPipe) query: QueryUserDTO) {
    return await this.userService.find(query)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.softDelete(id);
  }


}
