import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { QueryOptions, ToQueryOptionsPipe } from '@authdare/base';
import { Controller, Get, Query, Param, Body, Post, Patch, Delete } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags(UserController.name)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get()
  async find(@Query(ToQueryOptionsPipe) query: QueryOptions<UserEntity>) {
    console.log(query);
    return await this.userService.find(query)
  }

  @Get(":id")
  async fingById(@Param("id") id: number) {
    return await this.userService.findByIds(id);
  }

  @Post('query')
  async query(@Body() queryOptions: QueryOptions<UserEntity>) {
    return await this.userService.find(queryOptions);
  }

  @Post()
  async create(@Body() body: CreateUserDTO) {
    return await this.userService.create(body);
  }


  @Patch(":id")
  async update(@Param("id") id: number, @Body() body: UpdateUserDTO,) {
    return await this.userService.update(id, body);
  }


  @Delete(":id/:hard")
  async delete(@Param("id") id: number, @Param("hard") hard: boolean) {
    if (hard == true)
      return await this.userService.deleteHard(id);

    return await this.userService.softDelete(id);
  }
}
