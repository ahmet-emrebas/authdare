import { EntityFieldsNames } from 'typeorm/common/EntityFieldsNames';
import { FindConditions, ObjectLiteral, JoinOptions } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class QueryOptions<Entity> {
    /**
     * limit
     */
    @ApiProperty()
    take?: number;

    /**
     * offset
     */
    @ApiProperty()
    skip?: number;

    /**
    * Specifies what columns should be retrieved.
    */
    @ApiProperty()
    select?: (keyof Entity)[];
    /**
     * Simple condition that should be applied to match entities.
     */
    @ApiProperty()
    where?: FindConditions<Entity>[] | FindConditions<Entity> | ObjectLiteral | string;
    /**
     * Indicates what relations of entity should be loaded (simplified left join form).
     */
    @ApiProperty()
    relations?: string[];

    /**
     * Specifies what relations should be loaded.
     */
    @ApiProperty()
    join?: JoinOptions;
    /**
     * Order, in which entities should be ordered.
     */
    @ApiProperty()
    order?: {
        [P in EntityFieldsNames<Entity>]?: "ASC" | "DESC" | 1 | -1;
    };
    /**
     * Enables or disables query result caching.
     */
    @ApiProperty()
    cache?: boolean | number | {
        id: any;
        milliseconds: number;
    };
    /**
     * Indicates what locking mode should be used.
     *
     * Note: For lock tables, you must specify the table names and not the relation names
     */
    @ApiProperty()
    lock?: {
        mode: "optimistic";
        version: number | Date;
    } | {
        mode: "pessimistic_read" | "pessimistic_write" | "dirty_read" | "pessimistic_partial_write" | "pessimistic_write_or_fail" | "for_no_key_update";
        tables?: string[];
    };

    /**
     * Indicates if soft-deleted rows should be included in entity result.
     */
    @ApiProperty()
    withDeleted?: boolean;

    /**
     * If sets to true then loads all relation ids of the entity and maps them into relation values (not relation objects).
     * If array of strings is given then loads only relation ids of the given properties.
     */
    @ApiProperty()
    loadRelationIds?: boolean | {
        relations?: string[];
        disableMixedMap?: boolean;
    };
    /**
     * Indicates if eager relations should be loaded or not.
     * By default they are loaded when find methods are used.
     */
    @ApiProperty()
    loadEagerRelations?: boolean;

    /**
     * If this is set to true, SELECT query in a `find` method will be executed in a transaction.
     */
    @ApiProperty()
    transaction?: boolean;
}