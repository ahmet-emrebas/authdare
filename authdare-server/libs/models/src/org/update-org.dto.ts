import { PartialType } from '@nestjs/swagger';
import { CreateOrgDTO } from './create-org.dto';

export class UpdateOrgDTO extends PartialType(CreateOrgDTO) {
  static readonly className = 'UpdateOrgDTO';
}
