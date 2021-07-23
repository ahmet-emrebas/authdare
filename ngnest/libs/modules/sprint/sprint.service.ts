import { Repository } from 'typeorm';
import { CreateSprintDto, Sprint, UpdateSprintDto } from '@authdare/models';
import { BaseResourceService } from '@authdare/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SprintService extends BaseResourceService<
  Sprint,
  CreateSprintDto,
  UpdateSprintDto
> {
  constructor(@InjectRepository(Sprint) sprintRepo: Repository<Sprint>) {
    super(sprintRepo, CreateSprintDto, UpdateSprintDto);
  }
}
