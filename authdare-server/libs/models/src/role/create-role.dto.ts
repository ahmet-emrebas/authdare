import { internet } from 'faker';
import { BaseDTO } from '@authdare/base';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateRoleDTO extends BaseDTO<CreateRoleDTO> {
  static readonly className = 'CreateRoleDTO';
  @Expose()
  @ApiProperty({ default: internet.email(), required: true })
  name: string;

  @Expose()
  @ApiProperty({ default: [] })
  permissions: { id: number }[];
}
