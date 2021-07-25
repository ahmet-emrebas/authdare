import { CreateOrganizationDto } from './create-organization.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {
  constructor(values?: UpdateOrganizationDto) {
    super();
    Object.assign(this, values);
  }
}
