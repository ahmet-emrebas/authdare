import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { BaseQuery, TransformStringLike } from '@base/query';
import { name } from 'faker';

/**
 * This class is used to extract fields, which belongs to the entity class, from request query.
 * Then those extracted is written into the where property of FindManyOptions class as Queries, for example, Like(%vlaue%) etc.
 * There are several builtin Query Transformers like TransformStringLike, TransformDateBetween, TransformNumberBetween etc.
 * New Query Transformers can be created for specific usecases, under /base/query/query.transfomers file.
 * Those transformers are classToClass by default, which means they will be executed when you run classToClass transformer function with them.
 */
@Exclude()
export class QueryUserDto extends BaseQuery {
  @ApiProperty({ required: false })
  @Expose()
  @TransformStringLike()
  orgname: string;

  @ApiProperty({ required: false })
  @Expose()
  @TransformStringLike()
  firstName: string;

  @ApiProperty({ required: false })
  @Expose()
  @TransformStringLike()
  lastName: string;

  @ApiProperty({ required: false })
  @Expose()
  @TransformStringLike()
  middleName: string;

  @ApiProperty({ required: false })
  @Expose()
  @TransformStringLike()
  phone: string;

  @ApiProperty({ required: false })
  @Expose()
  @TransformStringLike()
  email: string;

  @ApiProperty({ required: false })
  @Expose()
  @TransformStringLike()
  password: string;

  @ApiProperty({ required: false })
  @Expose()
  @TransformStringLike()
  permissions: string;
}
