import { cloneDeep } from 'lodash';
import { TObjectify, TParseBool, TSplitBy } from '@authdare/utils';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { EntityFieldsNames } from 'typeorm/common/EntityFieldsNames';
import { t } from '.';

@Exclude()
export class QueryDTO<T> {
    /**
     * limit
     */
    @Expose()
    @ApiProperty({ required: false })
    take? = t<number>();

    /**
     * offset
     */
    @Expose()
    @ApiProperty({ required: false })
    skip? = t<number>();

    /**
     * Specifies what columns should be retrieved.
     */
    @Expose()
    @ApiProperty({ required: false })
    @TSplitBy(undefined, {})
    select? = t<string[]>();

    /**
     * Indicates what relations of entity should be loaded (simplified left join form).
     */
    @Expose()
    @ApiProperty({ required: false })
    @TSplitBy(undefined, {})
    relations? = t<string[]>();

    /**
     * Indicates if soft-deleted rows should be included in entity result.
     */
    @Expose()
    @ApiProperty({ required: false })
    @TParseBool()
    withDeleted? = t<boolean>();

    /**
     * Enables or disables query result caching.
     */
    @Expose()
    @ApiProperty({ required: false })
    @TParseBool()
    cache? = t<boolean>();

    /**
     * Indicates if eager relations should be loaded or not.
     * By default they are loaded when find methods are used.
     */
    @Expose()
    @ApiProperty({ required: false })
    @TParseBool()
    loadEagerRelations? = t<boolean>();

    /**
     * Order, in which entities should be ordered.
     */
    @Expose()
    @ApiProperty({ required: false })
    @TObjectify({})
    order? = t<{ [P in EntityFieldsNames<T>]?: 'ASC' | 'DESC' | 1 | -1 }>();

    /**
     * If this is set to true, SELECT query in a `find` method will be executed in a transaction.
     */
    @Expose()
    @ApiProperty({ required: false })
    @TParseBool()
    transaction? = t<boolean>();

    constructor(obj: QueryDTO<T>) {
        Object.assign(this, cloneDeep(obj));
    }
}
