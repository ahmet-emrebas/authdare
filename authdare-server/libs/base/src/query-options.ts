import { ToArray, ToBoolean, ToObject, ToWhereLike } from './transformers';
import { BaseDTO } from './base.dto';
import { FindConditions, JoinOptions, ObjectLiteral } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class QueryOptions<Entity = any> extends BaseDTO<QueryOptions<Entity>> {
    /**
    * limit
    */
    @Expose()
    @ApiProperty({ required: false })
    take?: number;

    /**
     * offset
     */
    @Expose()
    @ApiProperty({ required: false })
    skip?: number;

    /**
    * Specifies what columns should be retrieved.
    */
    @Expose()
    @ApiProperty({ required: false })
    @ToArray()
    select?: string;

    /**
     * Indicates what relations of entity should be loaded (simplified left join form).
     */
    @Expose()
    @ApiProperty({ required: false })
    @ToArray()
    relations?: string;

    /**
     * Indicates if soft-deleted rows should be included in entity result.
     */
    @Expose()
    @ApiProperty({ required: false })
    @ToBoolean()
    withDeleted?: boolean;

    /**
     * Enables or disables query result caching.
     */
    @Expose()
    @ApiProperty({ required: false })
    @ToBoolean()
    cache?: boolean

    /**
     * Indicates if eager relations should be loaded or not.
     * By default they are loaded when find methods are used.
     */
    @Expose()
    @ApiProperty({ required: false })
    @ToBoolean()
    loadEagerRelations?: boolean;

    /**
     * Simple condition that should be applied to match entities.
     */
    @Expose()
    @ApiProperty({ required: false })
    @ToWhereLike()
    where?: FindConditions<Entity>[] | FindConditions<Entity> | ObjectLiteral | string;

    /**
     * Specifies what relations should be loaded.
     */
    @Expose()
    @ApiProperty({ required: false })
    join?: JoinOptions;

    /**
     * Order, in which entities should be ordered.
     */
    @Expose()
    @ApiProperty({ required: false })
    @ToObject()
    order?: string // { [P in EntityFieldsNames<Entity>]?: "ASC" | "DESC" | 1 | -1; };

    /**
     * Indicates what locking mode should be used.
     *
     * Note: For lock tables, you must specify the table names and not the relation names
     */
    @Expose()
    @ApiProperty({ required: false })
    @ToObject()
    lock?: string;
    //      {
    //     mode: "optimistic";
    //     version: number | Date;
    // } | {
    //     mode: "pessimistic_read" | "pessimistic_write" | "dirty_read" | "pessimistic_partial_write" | "pessimistic_write_or_fail" | "for_no_key_update";
    //     tables?: string[];
    // };


    /**
     * If sets to true then loads all relation ids of the entity and maps them into relation values (not relation objects).
     * If array of strings is given then loads only relation ids of the given properties.
     */
    @Expose()
    @ApiProperty({ required: false })
    @ToBoolean()
    loadRelationIds?: boolean | {
        relations?: string[];
        disableMixedMap?: boolean;
    };


    /**
     * If this is set to true, SELECT query in a `find` method will be executed in a transaction.
     */
    @Expose()
    @ApiProperty({ required: false })
    transaction?: boolean;
}