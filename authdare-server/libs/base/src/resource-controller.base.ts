import { QueryTransformPipe } from './query-transform.pipe';
import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ResourceServiceBase } from './resource-service.base';
import { ValidationPipe } from './validation.pipe';

export class ResourceControllerBase<T, C, R, U, Q> {
  constructor(private resourceService: ResourceServiceBase<T>) {}

  @Get()
  get(@Query(QueryTransformPipe) query: Q) {}

  @Get(':id')
  getOne(@Param('id') id: number) {}

  @Post('query')
  query(@Body(QueryTransformPipe) query: Q) {}

  @Post()
  post(@Body(ValidationPipe) body: C) {}

  @Patch(':id')
  patch(@Param('id') id: number, @Body(ValidationPipe) updated: U) {}

  @Delete(':id')
  delete(@Param('id') id: number) {}
}
