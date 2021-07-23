import { ProfileService } from './profile.service';
import { CreateProfileDto, UpdateProfileDto } from '@authdare/models';
import {
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  Controller,
} from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('ProfileController')
@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @Post()
  async create(@Body() creaetDto: CreateProfileDto) {
    return await this.profileService.save(creaetDto);
  }

  @ApiOkResponse()
  @Get()
  async findAll(@Query() query: FindManyOptions) {
    return await this.profileService.find(query);
  }

  @ApiOkResponse()
  @Post('query')
  async findAllQuery(@Body() query: FindManyOptions) {
    return await this.profileService.find(query);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.profileService.find({ where: { id } });
  }

  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @ApiNotFoundResponse()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateProfileDto) {
    return await this.profileService.update(id, updateDto);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.profileService.delete(id);
  }
}
