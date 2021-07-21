import {
  TransformFromStringToArray,
  TransformFromStringToObject,
} from '../dto';
import { BaseClass } from '../entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsBoolean,
  IsBooleanString,
  IsNumberString,
  IsString,
} from 'class-validator';

/**
 * This is the query parameters that passed through ONLY URL not via body
 */
@Exclude()
export class FindManyQuery extends BaseClass<FindManyQuery> {
  @Expose() @ApiProperty({ nullable: true }) @IsNumberString() take?: number;

  @Expose() @ApiProperty({ nullable: true }) @IsNumberString() skip?: number;
  /**
   * Specifies what columns should be retrieved.
   */
  @Expose()
  @ApiProperty({ nullable: true })
  @TransformFromStringToArray()
  @IsString()
  select?: string; // (keyof Entity)[];

  /**
   * Simple condition that should be applied to match entities.
   */
  @Expose()
  @ApiProperty({ nullable: true })
  where?: any;

  /**
   * Indicates what relations of entity should be loaded (simplified left join form).
   */
  @Expose()
  @ApiProperty({ nullable: true })
  @TransformFromStringToArray()
  @IsString()
  relations?: string;

  /**
   * Order, in which entities should be ordered.
   * /?order=firstname:asc,lastName:desc
   */
  @Expose()
  @ApiProperty({ nullable: true })
  @TransformFromStringToObject(',', ':')
  @IsString()
  order?: string; //{    [P in EntityFieldsNames<Entity>]?: 'ASC' | 'DESC' | 1 | -1;  };

  /**
   * Enables or disables query result caching.
   */
  @Expose() @ApiProperty({ nullable: true }) @IsBoolean() cache?:
    | boolean
    | number;

  /**
   * Indicates if soft-deleted rows should be included in entity result.
   */
  @Expose()
  @ApiProperty({ nullable: true })
  @IsBooleanString()
  withDeleted?: boolean;

  /**
   * If sets to true then loads all relation ids of the entity and maps them into relation values (not relation objects).
   * If array of strings is given then loads only relation ids of the given properties.
   */
  @Expose()
  @ApiProperty({ nullable: true })
  @IsBooleanString()
  loadRelationIds?: boolean;

  /**
   * Indicates if eager relations should be loaded or not.
   * By default they are loaded when find methods are used.
   */
  @Expose()
  @ApiProperty({ nullable: true })
  @IsBooleanString()
  loadEagerRelations?: boolean;

  /**
   * If this is set to true, SELECT query in a `find` method will be executed in a transaction.
   */
  @Expose()
  @ApiProperty({ nullable: true })
  @IsBooleanString()
  transaction?: boolean;
}
