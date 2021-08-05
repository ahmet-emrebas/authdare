import { ValidationPipe } from '@nestjs/common';
import { TObjectify, TParseBool, TSplitBy } from "@authdare/utils";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { BaseClass } from "./base-class";

export const QueryValidationPipe = new ValidationPipe({ transform: true, transformOptions: { excludeExtraneousValues: true, exposeUnsetFields: false } });


@Exclude()
export class QueryDTO extends BaseClass<QueryDTO> {
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
    @TSplitBy()
    select?: string;

    /**
     * Indicates what relations of entity should be loaded (simplified left join form).
     */
    @Expose()
    @ApiProperty({ required: false })
    @TSplitBy()
    relations?: string;


    /**
     * Indicates if soft-deleted rows should be included in entity result.
     */
    @Expose()
    @ApiProperty({ required: false })
    @TParseBool()
    withDeleted?: boolean;


    /**
     * Enables or disables query result caching.
     */
    @Expose()
    @ApiProperty({ required: false })
    @TParseBool()
    cache?: boolean;


    /**
     * Indicates if eager relations should be loaded or not.
     * By default they are loaded when find methods are used.
     */
    @Expose()
    @ApiProperty({ required: false })
    loadEagerRelations?: boolean;


    /**
     * Order, in which entities should be ordered.
     */
    @Expose()
    @ApiProperty({ required: false })
    @TObjectify()
    order?: string; // { [P in EntityFieldsNames<Entity>]?: "ASC" | "DESC" | 1 | -1; };

    /**
     * Indicates what locking mode should be used.
     *
     * Note: For lock tables, you must specify the table names and not the relation names
     * ````
     *  {
     *      mode: "optimistic";
     *      version: number | Date;
     *  } 
     * ````
     */
    @Expose()
    @ApiProperty({ required: false })
    @TObjectify()
    lock?: string;


    /**
     * If sets to true then loads all relation ids of the entity and maps them into relation values (not relation objects).
     * If array of strings is given then loads only relation ids of the given properties.
     */
    @Expose()
    @ApiProperty({ required: false })
    @TParseBool()
    loadRelationIds?: boolean;


    /**
     * If this is set to true, SELECT query in a `find` method will be executed in a transaction.
     */
    @Expose()
    @ApiProperty({ required: false })
    @TParseBool()
    transaction?: boolean;
}