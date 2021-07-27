import { ApiProperty } from '@nestjs/swagger';
import { FindConditions, JoinOptions, ObjectLiteral } from 'typeorm';
import { EntityFieldsNames } from 'typeorm/common/EntityFieldsNames';

export class BasicQueryOptions<Entity> {
    @ApiProperty({ required: false, default: 10 }) skip?: number;
    @ApiProperty({ required: false, default: 10 }) take?: number;
    @ApiProperty({ required: false, default: ['id'] }) select?: (keyof Entity)[];
    @ApiProperty({ required: false, default: [] }) relations?: string[];
}

export class AdvanceQueryOptions<Entity> extends BasicQueryOptions<Entity> {

    /**
     * Simple condition that should be applied to match entities.
     */
    @ApiProperty({ required: false })
    where?:
        | FindConditions<Entity>[]
        | FindConditions<Entity>
        | ObjectLiteral
        | string;

    /**
     * Specifies what relations should be loaded.
     */
    @ApiProperty({ required: false })
    join?: JoinOptions;


    /**
     * Order, in which entities should be ordered.
     */
    @ApiProperty({ required: false, default: { id: 'ASC' } })
    order?: {
        [P in EntityFieldsNames<Entity>]?: 'ASC' | 'DESC' | 1 | -1;
    };

    /**
     * Enables or disables query result caching.
     */
    @ApiProperty({ required: false, default: true })
    cache?:
        | boolean
        | number
        | {
            id: any;
            milliseconds: number;
        };

    /**
     * Indicates what locking mode should be used.
     *
     * Note: For lock tables, you must specify the table names and not the relation names
     */
    @ApiProperty({ required: false, default: { mode: 'optimistic', version: 1 } })
    lock?:
        | {
            mode: 'optimistic';
            version: number | Date;
        }
        | {
            mode:
            | 'pessimistic_read'
            | 'pessimistic_write'
            | 'dirty_read'
            | 'pessimistic_partial_write'
            | 'pessimistic_write_or_fail'
            | 'for_no_key_update';
            tables?: string[];
        };

    /**
     * Indicates if soft-deleted rows should be included in entity result.
     */
    @ApiProperty({ required: false, default: true }) withDeleted?: boolean;
    /**
     * If sets to true then loads all relation ids of the entity and maps them into relation values (not relation objects).
     * If array of strings is given then loads only relation ids of the given properties.
     */
    @ApiProperty({ required: false, default: true }) loadRelationIds?:
        | boolean
        | {
            relations?: string[];
            disableMixedMap?: boolean;
        };
    /**
     * Indicates if eager relations should be loaded or not.
     * By default they are loaded when find methods are used.
     */
    @ApiProperty({ required: false, default: true }) loadEagerRelations?: boolean;
    /**
     * If this is set to true, SELECT query in a `find` method will be executed in a transaction.
     */
    @ApiProperty({ required: false, default: false }) transaction?: boolean;
}
