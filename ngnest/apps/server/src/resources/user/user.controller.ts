import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ParseArrayPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidateDtoPipe, ValidateManyDtoPipe } from '@pipes/validate-dto.pipe';
import { ApiTags } from '@nestjs/swagger';
import { QueryUserDto } from './dto';
import { toResourcePath } from '@base';
import { TransformQueryPipe } from '@pipes';
import { Public } from '@auth/public.decorator';

@ApiTags(UserController.name)
@Controller(toResourcePath(UserController))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get('count')
  count(@Query(TransformQueryPipe) findManyQuery: QueryUserDto) {
    return this.userService.count(findManyQuery);
  }

  @Post('validate')
  validate(@Body(ValidateDtoPipe) createUserDto: CreateUserDto) {
    return createUserDto;
  }

  @Post()
  save(@Body(ValidateDtoPipe) createUserDto: CreateUserDto) {
    return this.userService.save(createUserDto);
  }

  @Post('many')
  saveMany(@Body(ValidateManyDtoPipe) createUserDto: CreateUserDto[]) {
    return this.userService.saveMany(createUserDto);
  }

  @Get()
  find(@Query(TransformQueryPipe) findManyQuery: QueryUserDto) {
    return this.userService.find(findManyQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }

  @Delete('many')
  deleteMany(@Query('ids', ParseArrayPipe) ids: number[]) {
    return this.userService.deleteMany(ids);
  }

  @Delete('delete/all')
  async deleteAll() {
    return this.userService.deleteAll();
  }
}
