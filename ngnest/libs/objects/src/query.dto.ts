import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { TObjectify, TParseBool, TSplitBy } from '@authdare/utils';
import { ApiProperty } from '@nestjs/swagger';
import { ClassConstructor, Exclude, Expose } from 'class-transformer';
import { BaseClass } from './base-class';
import { FindManyOptions } from 'typeorm';
import { EntityFieldsNames } from 'typeorm/common/EntityFieldsNames';

export function QueryValidationPipe<T extends BaseClass<any> = any>(resourceQueryDTO: ClassConstructor<T>) {
    return class QueryValidationPipe implements PipeTransform {
        async transform(value: any, __metadata: ArgumentMetadata): Promise<FindManyOptions> {
            const query = await new QueryDTO(value).transformAndValidate({}, { exposeUnsetFields: false, excludeExtraneousValues: true });
            const fieldsQuery = await new resourceQueryDTO(value).transformAndValidate(
                {},
                { exposeUnsetFields: false, excludeExtraneousValues: true },
            );
            return {
                ...((query.errors ? {} : query.validatedInstance) as any),
                where: fieldsQuery.errors ? {} : fieldsQuery.validatedInstance,
            };
        }
    };
}

@Exclude()
export class QueryDTO<T> extends BaseClass<QueryDTO<T>> {
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
    @TSplitBy(undefined, { groups: ['get'] })
    select?: string[];

    /**
     * Indicates what relations of entity should be loaded (simplified left join form).
     */
    @Expose()
    @ApiProperty({ required: false })
    @TSplitBy(undefined, { groups: ['get'] })
    relations?: string[];

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
    @TParseBool()
    loadEagerRelations?: boolean;

    /**
     * Order, in which entities should be ordered.
     */
    @Expose()
    @ApiProperty({ required: false })
    @TObjectify({ groups: ['get'] })
    order?: { [P in EntityFieldsNames<T>]?: 'ASC' | 'DESC' | 1 | -1 };

    /**
     * If this is set to true, SELECT query in a `find` method will be executed in a transaction.
     */
    @Expose()
    @ApiProperty({ required: false })
    @TParseBool()
    transaction?: boolean;
}
