import { TransformParseBoolean, TransformSplitBy, TransformContainsQuery } from '@authdare/utils/transform';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToClass, Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsIn, isNotEmpty, IsOptional, Max, MaxLength, Min, validate, ValidationArguments } from 'class-validator';
import { pickBy, keys } from 'lodash';
import { ClientauthEntity, ClientauthStatusType, ClientauthStatuses } from '../entities';
import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'
import { Between, LessThan, MoreThan } from 'typeorm';

/**
 * Type of keys of ClientauthEntity class. 
 */
export type ClientauthEntityKey = keyof ClientauthEntity

/**
 * Define which fields will be included in database query.
 * @returns list of fields that the client can query the database with them.
 */
export const SelectableClientauthColumns = (): ClientauthEntityKey[] => keys(new ClientauthEntity()) as ClientauthEntityKey[];


/**
 * Define which relations will be included in database query
 * @returns list of relational tables
 */
export const RelationClientauthColumns = (): ClientauthEntityKey[] => [];

/**
 * Field type of QueryClientauth to determine which field is included or excluded during class transformation.
 */
export enum GroupClientauthEnum {
    QUERY = 'query',
    FIELD = 'field',
    TIME = 'time',
}

@Exclude()
export class QueryClientauthDTO {

    @ApiProperty({ required: false, default: 0 })
    @Expose({ groups: [GroupClientauthEnum.QUERY] })
    @Transform(({ value }) => parseInt(value) || 0)
    @Min(0)
    @IsOptional()
    take?: number;

    @ApiProperty({ required: false, default: 0 })
    @Expose({ groups: [GroupClientauthEnum.QUERY] })
    @Transform(({ value }) => parseInt(value) || 0)
    @IsOptional()
    @Min(0)
    skip?: number;

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupClientauthEnum.QUERY] })
    @TransformSplitBy(',')
    @IsIn(SelectableClientauthColumns(), { each: true })
    @IsOptional()
    select?: (keyof ClientauthEntity)[];


    @ApiProperty({ required: false })
    @Expose({ groups: [GroupClientauthEnum.QUERY] })
    @TransformSplitBy(',')
    @IsIn(RelationClientauthColumns(), { each: true, message: (args: ValidationArguments) => `The value '${args.value}' is not a relation of Clientauth` })
    @IsOptional()
    relations?: (keyof ClientauthEntity)[];

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupClientauthEnum.QUERY] })
    @TransformParseBoolean()
    @IsBoolean()
    @IsOptional()
    withDeleted: boolean



    // Time Fields to get items before and after time query.

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupClientauthEnum.TIME] })
    @IsOptional()
    @IsDate()
    @Transform(({ value }) => {
        const v = value && typeof value === 'string' && new Date(value);
        return v;
    }, { toClassOnly: true })
    @MaxLength(50)
    before?: string;


    @ApiProperty({ required: false })
    @Expose({ groups: [GroupClientauthEnum.TIME] })
    @IsOptional()
    @IsDate()
    @Transform(({ value }) => {
        const v = value && typeof value === 'string' && new Date(value);
        return v;
    }, { toClassOnly: true })
    @MaxLength(50)
    after?: string;


    // Add the fields of ClientauthEntity that will be included in database query.

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupClientauthEnum.FIELD] })
    @IsOptional()
    @TransformContainsQuery()
    @Max(50)
    email?: string;

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupClientauthEnum.FIELD] })
    @IsOptional()
    @TransformContainsQuery()
    @Max(400)
    orgname?: string;

    @ApiProperty({ required: false })
    @Expose({ groups: [GroupClientauthEnum.FIELD] })
    @IsOptional()
    @TransformContainsQuery()
    @IsIn(ClientauthStatuses())
    status?: ClientauthStatusType;

    constructor(obj: QueryClientauthDTO) {
        Object.assign(this, obj);
    }
}


export function plainToClientauthTransformer(value: QueryClientauthDTO, groups: string[]) {
    return pickBy(
        plainToClass(QueryClientauthDTO, value, {
            groups,
            excludeExtraneousValues: true,
            exposeUnsetFields: false
        }),
        e => isNotEmpty(e));  // Ignore null/undifiend/empty fields.
}

/**
 * Transform and validate the ClientauthQueryDTO
 * @throws {BadRequestException} when the ClientauthQueryDTO or its fields does not meet the validation requirements.
 */
export class TransformAndValidateQueryClientauthPipe implements PipeTransform {

    async transform(query: QueryClientauthDTO, metadata: ArgumentMetadata) {

        const allFields = plainToClientauthTransformer(query, [GroupClientauthEnum.QUERY, GroupClientauthEnum.FIELD, GroupClientauthEnum.TIME]);

        const errors = await validate(allFields);
        if (errors && errors.length > 0)
            throw new BadRequestException(errors);


        const baseQueryFields = plainToClientauthTransformer(query, [GroupClientauthEnum.QUERY]);
        const clientauthDTOQUeryFields = plainToClientauthTransformer(query, [GroupClientauthEnum.FIELD]);
        const timeQueryFields = plainToClientauthTransformer(query, [GroupClientauthEnum.TIME]);

        const created_at = Between(timeQueryFields.after || new Date("100"), timeQueryFields.before || new Date("90000"));



        if (created_at) {
            return { ...baseQueryFields, where: { ...clientauthDTOQUeryFields, created_at } }
        } else {
            return { ...baseQueryFields, where: { ...clientauthDTOQUeryFields } }

        }
    }
}




