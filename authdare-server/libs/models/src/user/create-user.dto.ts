import { CreateOrgDto } from './../org';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty() email: string;
  @ApiProperty() password: string;
  @ApiProperty() org: CreateOrgDto;
}
