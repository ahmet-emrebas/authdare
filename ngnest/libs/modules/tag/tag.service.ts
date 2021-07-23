import { Repository } from 'typeorm';
import { CreateTagDto, Tag, UpdateTagDto } from '@authdare/models';
import { BaseResourceService } from '@authdare/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagService extends BaseResourceService<
  Tag,
  CreateTagDto,
  UpdateTagDto
> {
  constructor(@InjectRepository(Tag) tagRepo: Repository<Tag>) {
    super(tagRepo, CreateTagDto, UpdateTagDto);
  }
}
