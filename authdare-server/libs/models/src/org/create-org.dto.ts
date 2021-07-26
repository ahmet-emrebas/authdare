import { ApiProperty } from '@nestjs/swagger';

export class CreateOrgDto {
  @ApiProperty({ default: 'aemrebas.dev@gmail.com' }) name: string;
}
