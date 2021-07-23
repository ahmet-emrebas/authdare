import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '@authdare/models';
import { Post, Body, Get, Patch, Delete, Param, Query, Controller } from "@nestjs/common";
import { FindManyOptions } from 'typeorm'
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';


@ApiTags('UserController')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @ApiCreatedResponse()
    @ApiUnprocessableEntityResponse()
    @Post()
    async create(@Body() creaetDto: CreateUserDto,) {
        return await this.userService.save(creaetDto);
    }

    @ApiOkResponse()
    @Get()
    async findAll(@Query() query: FindManyOptions) {
        return await this.userService.find(query);
    }

    @ApiOkResponse()
    @Post('query')
    async findAllQuery(@Body() query: FindManyOptions) {
        return await this.userService.find(query);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.userService.find({ where: { id } });
    }


    @ApiCreatedResponse()
    @ApiUnprocessableEntityResponse()
    @ApiNotFoundResponse()
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateDto: UpdateUserDto) {
        return await this.userService.update(id, updateDto);
    }

    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.userService.delete(id);
    }
}