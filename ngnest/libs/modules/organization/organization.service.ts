import { Repository } from 'typeorm';
import { CreateOrganizationDto, Organization, UpdateOrganizationDto } from '@authdare/models';
import { BaseResourceService } from '@authdare/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrganizationService extends BaseResourceService<
  Organization,
  CreateOrganizationDto,
  UpdateOrganizationDto
> {
  constructor(@InjectRepository(Organization) organizationRepo: Repository<Organization>) {
    super(organizationRepo, CreateOrganizationDto, UpdateOrganizationDto);
  }
}
