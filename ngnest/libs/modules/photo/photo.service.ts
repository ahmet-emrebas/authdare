import { Repository } from 'typeorm';
import { CreatePhotoDto, Photo, UpdatePhotoDto } from '@authdare/models';
import { BaseResourceService } from '@authdare/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PhotoService extends BaseResourceService<
  Photo,
  CreatePhotoDto,
  UpdatePhotoDto
> {
  constructor(@InjectRepository(Photo) photoRepo: Repository<Photo>) {
    super(photoRepo, CreatePhotoDto, UpdatePhotoDto);
  }
}
