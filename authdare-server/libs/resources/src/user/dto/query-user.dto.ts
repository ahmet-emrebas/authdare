import { TransformParseBoolean, TransformSplitBy, TransformContainsQuery } from '@authdare/utils/transform';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToClass, Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsIn, isNotEmpty, IsOptional, Max, MaxLength, Min, validate, ValidationArguments } from 'class-validator';
import { pickBy, keys } from 'lodash';
import { UserEntity, UserStatusType, UserStatuses } from '../entities';
import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'
import { Between } from 'typeorm';

/**
 * Type of keys of UserEntity class. 
 */
export type UserEntityKey = keyof UserEntity

/**
 * Define which fields will be included in database query.
 * @returns list of fields that the client can query the database with them.
 */
export const SelectableUserColumns = (): UserEntityKey[] => keys(new UserEntity()) as UserEntityKey[];


/**
 * Define which relations will be included in database query
 * @returns list of relational tables
 */
export const RelationUserColumns = (): UserEntityKey[] => [];

/**
 * Field type of QueryUser to determine which field is included or excluded during class transformation.
 */
export enum GroupUserEnum {
    QUERY = 'query',
    FIELD = 'field',
    TIME = 'time',
}

@Exclude()
export class QueryUserDTO {

    @ApiProperty({ required: false, default: 0 })
    @Expose({ groups: [GroupUserEnum.QUERY] })
    @Transform(({ value }) => parseInt(value) || 0)
    @Min(0)
    @IsOptional()
    take?: number;

    @ApiProperty({ required: false, default: 0 })
    @Expose({ groups: [GroupUserEnum.QUERY] })
    @Transform(({ value }) => parseInt(value) || 0)
    @IsOptional()
    @Min(0)
    skip?: number;

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupUserEnum.QUERY] })
    @TransformSplitBy(',')
    @IsIn(SelectableUserColumns(), { each: true })
    @IsOptional()
    select?: (keyof UserEntity)[];


    @ApiProperty({ required: false })
    @Expose({ groups: [GroupUserEnum.QUERY] })
    @TransformSplitBy(',')
    @IsIn(RelationUserColumns(), { each: true, message: (args: ValidationArguments) => `The value '${args.value}' is not a relation of User` })
    @IsOptional()
    relations?: (keyof UserEntity)[];

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupUserEnum.QUERY] })
    @TransformParseBoolean()
    @IsBoolean()
    @IsOptional()
    withDeleted: boolean



    // Time Fields to get items before and after time query.

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupUserEnum.TIME] })
    @IsOptional()
    @IsDate()
    @Transform(({ value }) => {
        const v = value && typeof value === 'string' && new Date(value);
        return v;
    }, { toClassOnly: true })
    @MaxLength(50)
    before?: string;


    @ApiProperty({ required: false })
    @Expose({ groups: [GroupUserEnum.TIME] })
    @IsOptional()
    @IsDate()
    @Transform(({ value }) => {
        const v = value && typeof value === 'string' && new Date(value);
        return v;
    }, { toClassOnly: true })
    @MaxLength(50)
    after?: string;


    // Add the fields of UserEntity that will be included in database query.

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupUserEnum.FIELD] })
    @IsOptional()
    @TransformContainsQuery()
    @Max(50)
    email?: string;

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupUserEnum.FIELD] })
    @IsOptional()
    @TransformContainsQuery()
    @Max(400)
    org?: string;

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupUserEnum.FIELD] })
    @IsOptional()
    @TransformContainsQuery()
    @IsIn(UserStatuses())
    status?: UserStatusType;

    constructor(obj: QueryUserDTO) {
        Object.assign(this, obj);
    }
}


export function plainToUserTransformer(value: QueryUserDTO, groups: string[]) {
    return pickBy(
        plainToClass(QueryUserDTO, value, {
            groups,
            excludeExtraneousValues: true,
            exposeUnsetFields: false
        }),
        e => isNotEmpty(e));  // Ignore null/undifiend/empty fields.
}

/**
 * Transform and validate the UserQueryDTO
 * @throws {BadRequestException} when the UserQueryDTO or its fields does not meet the validation requirements.
 */
export class TransformAndValidateQueryUserPipe implements PipeTransform {

    async transform(query: QueryUserDTO, metadata: ArgumentMetadata) {

        const allFields = plainToUserTransformer(query, [GroupUserEnum.QUERY, GroupUserEnum.FIELD, GroupUserEnum.TIME]);

        const errors = await validate(allFields);
        if (errors && errors.length > 0)
            throw new BadRequestException(errors);


        const baseQueryFields = plainToUserTransformer(query, [GroupUserEnum.QUERY]);
        const userDTOQUeryFields = plainToUserTransformer(query, [GroupUserEnum.FIELD]);
        const timeQueryFields = plainToUserTransformer(query, [GroupUserEnum.TIME]);

        const created_at = Between(timeQueryFields.after || new Date("100"), timeQueryFields.before || new Date("90000"));

        return { ...baseQueryFields, where: { ...userDTOQUeryFields, created_at } }
    }
}




