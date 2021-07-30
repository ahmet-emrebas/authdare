import { TransformSplitBy } from '@authdare/utils/transform';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToClass, Transform } from 'class-transformer';
import { IsDate, IsIn, isNotEmpty, IsOptional, Max, MaxLength, Min, validate, ValidationArguments } from 'class-validator';
import { pickBy, keys } from 'lodash';
import { TaskEntity } from '../entities';
import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'
import { Between } from 'typeorm';
import { TransformContainsQuery } from '@authdare/utils/transform/contains-query.transform';

/**
 * Type of keys of TaskEntity class. 
 */
export type TaskEntityKey = keyof TaskEntity

/**
 * Define which fields will be included in database query.
 * @returns list of fields that the client can query the database with them.
 */
export const SelectableTaskColumns = (): TaskEntityKey[] => keys(new TaskEntity()) as TaskEntityKey[];


/**
 * Define which relations will be included in database query
 * @returns list of relational tables
 */
export const RelationTaskColumns = (): TaskEntityKey[] => [];

/**
 * Field type of QueryTask to determine which field is included or excluded during class transformation.
 */
export enum TaskFieldType {
    QUERY = 'query',
    FIELD = 'field',
    TIME = 'time',
}

@Exclude()
export class QueryTaskDTO {

    @ApiProperty({ required: false, default: 0 })
    @Expose({ groups: [TaskFieldType.QUERY] })
    @Transform(({ value }) => parseInt(value) || 0)
    @Min(0)
    @IsOptional()
    take?: number;

    @ApiProperty({ required: false, default: 0 })
    @Expose({ groups: [TaskFieldType.QUERY] })
    @Transform(({ value }) => parseInt(value) || 0)
    @IsOptional()
    @Min(0)
    skip?: number;

    @ApiProperty({ required: false })
    @Expose({ groups: [TaskFieldType.QUERY] })
    @TransformSplitBy(',')
    @IsIn(SelectableTaskColumns(), { each: true })
    @IsOptional()
    select?: (keyof TaskEntity)[];


    @ApiProperty({ required: false })
    @Expose({ groups: [TaskFieldType.QUERY] })
    @TransformSplitBy(',')
    @IsIn(RelationTaskColumns(), { each: true, message: (args: ValidationArguments) => `The value '${args.value}' is not a relation of Task` })
    @IsOptional()
    relations?: (keyof TaskEntity)[];


    // Time Fields to get items before and after time query.

    @ApiProperty({ required: false })
    @Expose({ groups: [TaskFieldType.TIME] })
    @IsOptional()
    @IsDate()
    @Transform(({ value }) => {
        const v = value && typeof value === 'string' && new Date(value);
        return v;
    }, { toClassOnly: true })
    @MaxLength(50)
    before?: string;


    @ApiProperty({ required: false })
    @Expose({ groups: [TaskFieldType.TIME] })
    @IsOptional()
    @IsDate()
    @Transform(({ value }) => {
        const v = value && typeof value === 'string' && new Date(value);
        return v;
    }, { toClassOnly: true })
    @MaxLength(50)
    after?: string;


    // Add the fields of TaskEntity that will be included in database query.

    @ApiProperty({ required: false })
    @Expose({ groups: [TaskFieldType.FIELD] })
    @IsOptional()
    @TransformContainsQuery()
    @Max(50)
    title?: string;

    @ApiProperty({ required: false })
    @Expose({ groups: [TaskFieldType.FIELD] })
    @IsOptional()
    @TransformContainsQuery()
    @Max(400)
    description?: string;

    constructor(obj: QueryTaskDTO) {
        Object.assign(this, obj);
    }
}


export function plainTaskToClass(value: QueryTaskDTO, groups: string[]) {
    return pickBy(
        plainToClass(QueryTaskDTO, value, {
            groups,
            excludeExtraneousValues: true,
            exposeUnsetFields: false
        }),
        e => isNotEmpty(e));  // Ignore null/undifiend/empty fields.
}

/**
 * Transform and validate the TaskQueryDTO
 * @throws {BadRequestException} when the TaskQueryDTO or its fields does not meet the validation requirements.
 */
export class TransformAndValidateQueryTaskDTO implements PipeTransform {

    async transform(query: QueryTaskDTO, metadata: ArgumentMetadata) {

        const allFields = plainTaskToClass(query, [TaskFieldType.QUERY, TaskFieldType.FIELD, TaskFieldType.TIME]);

        const errors = await validate(allFields);
        if (errors && errors.length > 0)
            throw new BadRequestException(errors);


        const baseQueryFields = plainTaskToClass(query, [TaskFieldType.QUERY]);
        const taskDTOQUeryFields = plainTaskToClass(query, [TaskFieldType.FIELD]);
        const timeQueryFields = plainTaskToClass(query, [TaskFieldType.TIME]);

        const created_at = Between(timeQueryFields.after || new Date("100"), timeQueryFields.before || new Date("90000"));

        return { ...baseQueryFields, where: { ...taskDTOQUeryFields, created_at } }
    }
}




