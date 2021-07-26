import { ApiProperty } from '@nestjs/swagger';

export class CreateOrgDto {
  @ApiProperty() name: string;
}
