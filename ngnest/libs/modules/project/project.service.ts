import { Repository } from 'typeorm';
import { CreateProjectDto, Project, UpdateProjectDto } from '@authdare/models';
import { BaseResourceService } from '@authdare/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectService extends BaseResourceService<
  Project,
  CreateProjectDto,
  UpdateProjectDto
> {
  constructor(@InjectRepository(Project) projectRepo: Repository<Project>) {
    super(projectRepo, CreateProjectDto, UpdateProjectDto);
  }
}
