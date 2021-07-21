import { BaseClass } from '@base';
import { TransformDateBetween } from './query.transformers';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNumberString } from 'class-validator';

/**
 * This query class is only for URL Query
 */
@Exclude()
export class BaseQuery extends BaseClass<BaseQuery> {
  @ApiProperty({ required: false })
  @Expose()
  @IsNumberString()
  id: number;

  @ApiProperty({ required: false })
  @TransformDateBetween()
  @Expose()
  created_at: Date;

  @ApiProperty({ required: false })
  @TransformDateBetween()
  @Expose()
  updated_at: Date;

  @ApiProperty({ required: false })
  @TransformDateBetween()
  @Expose()
  deleted_at: Date;
}
