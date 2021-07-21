import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { CreateAuthUserDto } from './dto/create-auth-user.dto';
import { UpdateAuthUserDto } from './dto/update-auth-user.dto';
import { AuthUser } from "./entities";
import { Repository } from "typeorm";


@Controller('authusers')
export class AuthUserController {
  constructor(@InjectRepository(AuthUser) private readonly authUser: Repository<AuthUser>) { }

  @Post()
  create(@Body() createAuthUserDto: CreateAuthUserDto) {
    return this.authUser.create(createAuthUserDto);
  }

  @Get()
  findAll() {
    return this.authUser.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authUser.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthUserDto: UpdateAuthUserDto) {
    return this.authUser.update(+id, updateAuthUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authUser.delete(id)
  }
}
