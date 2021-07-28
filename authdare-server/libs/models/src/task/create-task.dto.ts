import { BaseDTO } from '@authdare/base';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsIn, MaxLength } from 'class-validator';

@Exclude()
export class CreateTaskDTO extends BaseDTO<CreateTaskDTO> {
  static readonly className = 'CreateTaskDTO';

  @Expose()
  @ApiProperty({ default: 'name', required: true })
  @MaxLength(50)
  name: string;

  @Expose()
  @ApiProperty({ default: 'description', required: true })
  @MaxLength(300)
  description: string;

  @Expose()
  @ApiProperty({ default: new Date().toUTCString(), required: true })
  due: string;

  @Expose()
  @ApiProperty({
    default: 'inprogress',
    required: true,
    enum: ['closed', 'inprogress', 'opened'],
  })
  @IsIn(['closed', 'inprogress', 'opened'])
  status: string;
}
