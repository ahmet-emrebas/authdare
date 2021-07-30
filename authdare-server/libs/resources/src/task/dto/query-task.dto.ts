import { TransformParseBoolean, TransformSplitBy, TransformContainsQuery } from '@authdare/utils/transform';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToClass, Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsIn, isNotEmpty, IsOptional, Max, MaxLength, Min, validate, ValidationArguments } from 'class-validator';
import { pickBy, keys } from 'lodash';
import { TaskEntity, TaskStatusType, TaskStatuses } from '../entities';
import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'
import { Between } from 'typeorm';

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
export enum GroupTaskEnum {
    QUERY = 'query',
    FIELD = 'field',
    TIME = 'time',
}

@Exclude()
export class QueryTaskDTO {

    @ApiProperty({ required: false, default: 0 })
    @Expose({ groups: [GroupTaskEnum.QUERY] })
    @Transform(({ value }) => parseInt(value) || 0)
    @Min(0)
    @IsOptional()
    take?: number;

    @ApiProperty({ required: false, default: 0 })
    @Expose({ groups: [GroupTaskEnum.QUERY] })
    @Transform(({ value }) => parseInt(value) || 0)
    @IsOptional()
    @Min(0)
    skip?: number;

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupTaskEnum.QUERY] })
    @TransformSplitBy(',')
    @IsIn(SelectableTaskColumns(), { each: true })
    @IsOptional()
    select?: (keyof TaskEntity)[];


    @ApiProperty({ required: false })
    @Expose({ groups: [GroupTaskEnum.QUERY] })
    @TransformSplitBy(',')
    @IsIn(RelationTaskColumns(), { each: true, message: (args: ValidationArguments) => `The value '${args.value}' is not a relation of Task` })
    @IsOptional()
    relations?: (keyof TaskEntity)[];

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupTaskEnum.QUERY] })
    @TransformParseBoolean()
    @IsBoolean()
    @IsOptional()
    withDeleted: boolean



    // Time Fields to get items before and after time query.

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupTaskEnum.TIME] })
    @IsOptional()
    @IsDate()
    @Transform(({ value }) => {
        const v = value && typeof value === 'string' && new Date(value);
        return v;
    }, { toClassOnly: true })
    @MaxLength(50)
    before?: string;


    @ApiProperty({ required: false })
    @Expose({ groups: [GroupTaskEnum.TIME] })
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
    @Expose({ groups: [GroupTaskEnum.FIELD] })
    @IsOptional()
    @TransformContainsQuery()
    @Max(50)
    title?: string;

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupTaskEnum.FIELD] })
    @IsOptional()
    @TransformContainsQuery()
    @Max(400)
    description?: string;

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupTaskEnum.FIELD] })
    @IsOptional()
    @TransformContainsQuery()
    @IsIn(TaskStatuses())
    status?: TaskStatusType;

    constructor(obj: QueryTaskDTO) {
        Object.assign(this, obj);
    }
}


export function plainToTaskTransformer(value: QueryTaskDTO, groups: string[]) {
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
export class TransformAndValidateQueryTaskPipe implements PipeTransform {

    async transform(query: QueryTaskDTO, metadata: ArgumentMetadata) {

        const allFields = plainToTaskTransformer(query, [GroupTaskEnum.QUERY, GroupTaskEnum.FIELD, GroupTaskEnum.TIME]);

        const errors = await validate(allFields);
        if (errors && errors.length > 0)
            throw new BadRequestException(errors);


        const baseQueryFields = plainToTaskTransformer(query, [GroupTaskEnum.QUERY]);
        const taskDTOQUeryFields = plainToTaskTransformer(query, [GroupTaskEnum.FIELD]);
        const timeQueryFields = plainToTaskTransformer(query, [GroupTaskEnum.TIME]);

        const created_at = Between(timeQueryFields.after || new Date("100"), timeQueryFields.before || new Date("90000"));
        console.log(created_at);
        return { ...baseQueryFields, where: { ...taskDTOQUeryFields, created_at } }
    }
}




