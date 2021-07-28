import { PermissionService } from './permission.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { QueryOptions, ToQueryOptionsPipe } from '@authdare/base';
import {
  CreatePermissionDTO,
  UpdatePermissionDTO,
  PermissionEntity,
} from '@authdare/models';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AuthdarePermissionController')
@Controller('authdare/permissions')
export class PermissionController {
  static readonly className = 'PermissionController';
  constructor(protected readonly permissionService: PermissionService) {}

  @Get()
  async find(@Query(ToQueryOptionsPipe) query: QueryOptions<PermissionEntity>) {
    return await this.permissionService.find(query);
  }

  @Get(':id')
  async fingById(@Param('id') id: number) {
    return await this.permissionService.findByIds(id);
  }

  @Post('query')
  async query(@Body() queryOptions: QueryOptions<PermissionEntity>) {
    return await this.permissionService.find(queryOptions);
  }

  @Post()
  async create(@Body() body: CreatePermissionDTO) {
    return await this.permissionService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: UpdatePermissionDTO) {
    return await this.permissionService.update(id, body);
  }

  @Delete(':id/:hard')
  async delete(@Param('id') id: number, @Param('hard') hard: boolean) {
    if (hard == true) return await this.permissionService.deleteHard(id);
    return await this.permissionService.softDelete(id);
  }
}
