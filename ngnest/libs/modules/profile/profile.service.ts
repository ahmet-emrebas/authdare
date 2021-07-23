import { Repository } from 'typeorm';
import { CreateProfileDto, Profile, UpdateProfileDto } from '@authdare/models';
import { BaseResourceService } from '@authdare/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfileService extends BaseResourceService<
  Profile,
  CreateProfileDto,
  UpdateProfileDto
> {
  constructor(@InjectRepository(Profile) profileRepo: Repository<Profile>) {
    super(profileRepo, CreateProfileDto, UpdateProfileDto);
  }
}
