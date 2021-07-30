import { TransformParseBoolean, TransformSplitBy, TransformContainsQuery } from '@authdare/utils/transform';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToClass, Transform, classToPlain } from 'class-transformer';
import { IsBoolean, IsIn, isNotEmpty, IsOptional, Max, Min, validate, ValidationArguments } from 'class-validator';
import { pickBy, keys } from 'lodash';
import { TaskEntity, TaskStatusType, TaskStatuses } from '../entities';
import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'

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


/**
 * 
 * 
 * 
 * @Notes
 *
 *   // Time Fields to get items before and after time query.
 *
 *   // Some how not compatiple with 
 *   // @ApiProperty({ required: false })
 *   // @Expose({ groups: [GroupTaskEnum.TIME] })
 *   // @IsOptional()
 *   // @IsDate()
 *   // @Transform(({ value }) => {
 *   //     const v = value && typeof value === 'string' && new Date(value);
 *   //     return v;
 *   // }, { toClassOnly: true })
 *   // @MaxLength(50)
 *   // before?: string;
 *
 *
 *   // @ApiProperty({ required: false })
 *   // @Expose({ groups: [GroupTaskEnum.TIME] })
 *   // @IsOptional()
 *   // @IsDate()
 *   // @Transform(({ value }) => {
 *   //     const v = value && typeof value === 'string' && new Date(value);
 *   //     return v;
 *   // }, { toClassOnly: true })
 *   // @MaxLength(50)
 *   // after?: string;
 *
 *
 *   // Add the fields of TaskEntity that will be included in database query.
 */
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

    @ApiProperty({ required: false, enum: SelectableTaskColumns() })
    @Expose({ groups: [GroupTaskEnum.QUERY] })
    @TransformSplitBy(',')
    @IsOptional()
    @IsIn(SelectableTaskColumns(), { each: true })
    select?: (keyof TaskEntity)[];


    @ApiProperty({ required: false, enum: RelationTaskColumns() })
    @Expose({ groups: [GroupTaskEnum.QUERY] })
    @TransformSplitBy(',')
    @IsOptional()
    @IsIn(RelationTaskColumns(), { each: true, message: (args: ValidationArguments) => `The value '${args.value}' is not a relation of Task` })
    relations?: (keyof TaskEntity)[];

    @ApiProperty({ required: false, default: false })
    @Expose({ groups: [GroupTaskEnum.QUERY] })
    @TransformParseBoolean()
    @IsBoolean()
    @IsOptional()
    withDeleted?: boolean



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

/**
 * Convert plain QueryTask object to class by including the fields with corresponding groups.
 * The options, "excludeExtraneousValues: true, exposeUnsetFields: false", is applied.
 * @param value 
 * @param groups 
 * @returns 
 */
function plainToQueryTaskByGroups(value: QueryTaskDTO, groups: GroupTaskEnum[]) {
    return plainToClass(QueryTaskDTO, value, {
        groups,
        excludeExtraneousValues: true,
        exposeUnsetFields: false
    })
}


/**
 * Validate the all fields of QueryTaskDTO, and return the class instance.
 * @param query 
 */
async function validateQueryAndToQueryTaskClass(query: QueryTaskDTO): Promise<QueryTaskDTO> {
    const queryTaskDTO = plainToQueryTaskByGroups(query, [GroupTaskEnum.QUERY, GroupTaskEnum.FIELD, GroupTaskEnum.TIME]);
    const errors = await validate(queryTaskDTO);
    if (errors && errors.length > 0) throw new BadRequestException(errors);
    return queryTaskDTO
}

/**
 * Extract none empty fields of the Query Group and return the partial plain object,containing only the group members of Query, of the QueryTask 
 * @param classQueryTask 
 * @returns 
 */
function toPlainQueryGroup(classQueryTask: QueryTaskDTO) {
    return pickBy(classToPlain(classQueryTask, { groups: [GroupTaskEnum.QUERY] }), (e) => isNotEmpty(e));
}

/**
 * Extract none empty fields of the Field Group and return the partial plain object,containing only the group members of Query, of the QueryTask 
 * @param classQueryTask 
 * @returns 
 */
function toPlainFieldGroup(classQueryTask: QueryTaskDTO) {
    return pickBy(classToPlain(classQueryTask, { groups: [GroupTaskEnum.FIELD] }), (e) => isNotEmpty(e))
}


/**
 * Transform and validate the TaskQueryDTO and return the PLAIN Object
 * 
 * @Notes
 * 
 *   // Sqlite Does not work with this for some reason.
 *   // const created_at = Between(timeQueryFields.after || new Date("100"), timeQueryFields.before || new Date("90000"));
 *   // const timeQueryFields = plainToQueryTaskByGroups(query, [GroupTaskEnum.TIME]);
 * 
 * 
 * 
 * 
 * @throws {BadRequestException} when the TaskQueryDTO or its fields does not meet the validation requirements.
 */
export class TransformAndValidateQueryTaskPipe implements PipeTransform {
    async transform(query: QueryTaskDTO, metadata: ArgumentMetadata) {
        const classQueryTask = await validateQueryAndToQueryTaskClass(query);
        return {
            // Common Query options 
            ...toPlainQueryGroup(classQueryTask),
            // Query of Entity Fields
            where: toPlainFieldGroup(classQueryTask),
        }
    }
}




