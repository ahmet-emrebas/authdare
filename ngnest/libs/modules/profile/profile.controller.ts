import { QueryOptions } from './../../core/src/controller/query-options';
import { ProfileService } from './profile.service';
import { CreateProfileDto, UpdateProfileDto, Profile } from '@authdare/models';
import {
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  Controller,
  Logger,
} from '@nestjs/common';
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
  constructor(private profileService: ProfileService) { }

  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @Post()
  async create(@Body() creaetDto: CreateProfileDto) {
    try {
      return await this.profileService.save(creaetDto);
    } catch (err) {
      Logger.error(err, ProfileController.name);
      return err;
    }
  }

  @ApiOkResponse()
  @Get()
  async findAll(@Query() query: QueryOptions<Profile>) {
    try {
      return await this.profileService.find(query);
    } catch (err) {
      Logger.error(err);
      return err;
    }
  }

  @ApiOkResponse()
  @Post('query')
  async findAllQuery(@Body() query: QueryOptions<Profile>) {
    try {
      return await this.profileService.find(query);
    } catch (err) {
      Logger.error(err);
      return err;
    }
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.profileService.find({ where: { id } });
    } catch (err) {
      Logger.error(err);
      return err;
    }
  }

  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @ApiNotFoundResponse()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateProfileDto) {
    try {
      return await this.profileService.update(id, updateDto);
    } catch (err) {
      Logger.error(err);
      return err;
    }
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.profileService.delete(id);
    } catch (err) {
      Logger.error(err);
      return err;
    }
  }
}
