import { ApiProperty } from '@nestjs/swagger';

export class RequestParams {
  @ApiProperty({ required: true, default: 'tasks' }) resource?: string;
  @ApiProperty({ required: true, default: 'authdare' }) orgname?: string;
  @ApiProperty({ required: false, default: 1 }) id?: number;
}
