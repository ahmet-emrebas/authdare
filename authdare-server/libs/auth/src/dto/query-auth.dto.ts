import { TransformParseBoolean, TransformSplitBy, TransformContainsQuery } from '@authdare/utils/transform';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToClass, Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsIn, isNotEmpty, IsOptional, Max, MaxLength, Min, validate, ValidationArguments } from 'class-validator';
import { pickBy, keys } from 'lodash';
import { AuthEntity, AuthStatusType, AuthStatuses } from '../entities';
import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'
import { Between } from 'typeorm';

/**
 * Type of keys of AuthEntity class. 
 */
export type AuthEntityKey = keyof AuthEntity

/**
 * Define which fields will be included in database query.
 * @returns list of fields that the client can query the database with them.
 */
export const SelectableAuthColumns = (): AuthEntityKey[] => keys(new AuthEntity()) as AuthEntityKey[];


/**
 * Define which relations will be included in database query
 * @returns list of relational tables
 */
export const RelationAuthColumns = (): AuthEntityKey[] => [];

/**
 * Field type of QueryAuth to determine which field is included or excluded during class transformation.
 */
export enum GroupAuthEnum {
    QUERY = 'query',
    FIELD = 'field',
    TIME = 'time',
}

@Exclude()
export class QueryAuthDTO {

    @ApiProperty({ required: false, default: 0 })
    @Expose({ groups: [GroupAuthEnum.QUERY] })
    @Transform(({ value }) => parseInt(value) || 0)
    @Min(0)
    @IsOptional()
    take?: number;

    @ApiProperty({ required: false, default: 0 })
    @Expose({ groups: [GroupAuthEnum.QUERY] })
    @Transform(({ value }) => parseInt(value) || 0)
    @IsOptional()
    @Min(0)
    skip?: number;

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupAuthEnum.QUERY] })
    @TransformSplitBy(',')
    @IsIn(SelectableAuthColumns(), { each: true })
    @IsOptional()
    select?: (keyof AuthEntity)[];


    @ApiProperty({ required: false })
    @Expose({ groups: [GroupAuthEnum.QUERY] })
    @TransformSplitBy(',')
    @IsIn(RelationAuthColumns(), { each: true, message: (args: ValidationArguments) => `The value '${args.value}' is not a relation of Auth` })
    @IsOptional()
    relations?: (keyof AuthEntity)[];

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupAuthEnum.QUERY] })
    @TransformParseBoolean()
    @IsBoolean()
    @IsOptional()
    withDeleted: boolean



    // Time Fields to get items before and after time query.

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupAuthEnum.TIME] })
    @IsOptional()
    @IsDate()
    @Transform(({ value }) => {
        const v = value && typeof value === 'string' && new Date(value);
        return v;
    }, { toClassOnly: true })
    @MaxLength(50)
    before?: string;


    @ApiProperty({ required: false })
    @Expose({ groups: [GroupAuthEnum.TIME] })
    @IsOptional()
    @IsDate()
    @Transform(({ value }) => {
        const v = value && typeof value === 'string' && new Date(value);
        return v;
    }, { toClassOnly: true })
    @MaxLength(50)
    after?: string;


    // Add the fields of AuthEntity that will be included in database query.

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupAuthEnum.FIELD] })
    @IsOptional()
    @TransformContainsQuery()
    @Max(50)
    email?: string;

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupAuthEnum.FIELD] })
    @IsOptional()
    @TransformContainsQuery()
    @Max(400)
    org?: string;

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupAuthEnum.FIELD] })
    @IsOptional()
    @TransformContainsQuery()
    @IsIn(AuthStatuses())
    status?: AuthStatusType;

    constructor(obj: QueryAuthDTO) {
        Object.assign(this, obj);
    }
}


export function plainToAuthTransformer(value: QueryAuthDTO, groups: string[]) {
    return pickBy(
        plainToClass(QueryAuthDTO, value, {
            groups,
            excludeExtraneousValues: true,
            exposeUnsetFields: false
        }),
        e => isNotEmpty(e));  // Ignore null/undifiend/empty fields.
}

/**
 * Transform and validate the AuthQueryDTO
 * @throws {BadRequestException} when the AuthQueryDTO or its fields does not meet the validation requirements.
 */
export class TransformAndValidateQueryAuthPipe implements PipeTransform {

    async transform(query: QueryAuthDTO, metadata: ArgumentMetadata) {

        const allFields = plainToAuthTransformer(query, [GroupAuthEnum.QUERY, GroupAuthEnum.FIELD, GroupAuthEnum.TIME]);

        const errors = await validate(allFields);
        if (errors && errors.length > 0)
            throw new BadRequestException(errors);


        const baseQueryFields = plainToAuthTransformer(query, [GroupAuthEnum.QUERY]);
        const authDTOQUeryFields = plainToAuthTransformer(query, [GroupAuthEnum.FIELD]);
        const timeQueryFields = plainToAuthTransformer(query, [GroupAuthEnum.TIME]);

        const created_at = Between(timeQueryFields.after || new Date("100"), timeQueryFields.before || new Date("90000"));

        return { ...baseQueryFields, where: { ...authDTOQUeryFields, created_at } }
    }
}




