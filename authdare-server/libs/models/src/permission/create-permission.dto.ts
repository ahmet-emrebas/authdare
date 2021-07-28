import { BaseDTO } from '@authdare/base';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreatePermissionDTO extends BaseDTO<CreatePermissionDTO> {
  static readonly className = 'CreatePermissionDTO';
  @Expose()
  @ApiProperty({ default: 'GET', required: true })
  method: string;

  @Expose()
  @ApiProperty({ default: 'users', required: true })
  resource: string;
}
