import { TransformContainsQuery } from '@authdare/utils/transform/contains-query.transform';
import { TransformSplitBy } from '@authdare/utils/transform/split-by.transform';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToClass, Transform } from 'class-transformer';
import { IsDate, IsIn, isNotEmpty, IsOptional, IsString, Max, MaxLength, Min, validate, ValidationArguments } from 'class-validator';
import { pickBy } from 'lodash';
import { TaskEntity } from '../entities';
import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'
import { Between } from 'typeorm';
export type TaskEntityKey = keyof TaskEntity
export const SelectableTaskColumns = (): TaskEntityKey[] => ['id', 'title', 'description', 'created_at', 'updated_at', 'deleted_at']
export const RelationTaskColumns = (): TaskEntityKey[] => [];


@Exclude()
export class QueryTaskDTO {

    @ApiProperty({ required: false, default: 0 })
    @Expose({ groups: ['query'] })
    @Transform(({ value }) => parseInt(value) || 0)
    @Min(0)
    @IsOptional()
    take: number;

    @ApiProperty({ required: false, default: 0 })
    @Expose({ groups: ['query'] })
    @Transform(({ value }) => parseInt(value) || 0)
    @IsOptional()
    @Min(0)
    skip: number;

    @ApiProperty({ required: false })
    @Expose({ groups: ['query'] })
    @TransformSplitBy(',')
    @IsIn(SelectableTaskColumns(), { each: true })
    @IsOptional()
    select: (keyof TaskEntity)[];


    @ApiProperty({ required: false })
    @Expose({ groups: ['query'] })
    @TransformSplitBy(',')
    @IsIn(RelationTaskColumns(), { each: true, message: (args: ValidationArguments) => `The value '${args.value}' is not a relation of Task` })
    @IsOptional()
    relations: (keyof TaskEntity)[];


    // Time Fields to get items before and after time query.

    @ApiProperty()
    @Expose({ groups: ['time'] })
    @IsOptional()
    @IsDate()
    @Transform(({ value }) => {
        const v = value && typeof value === 'string' && new Date(value);
        return v;
    }, { toClassOnly: true })
    @MaxLength(50)
    before: string;


    @ApiProperty()
    @Expose({ groups: ['time'] })
    @IsOptional()
    @IsDate()
    @Transform(({ value }) => {
        const v = value && typeof value === 'string' && new Date(value);
        return v;
    }, { toClassOnly: true })
    @MaxLength(50)
    after: string;


    // TaskEntity Fields 

    @ApiProperty({ required: false })
    @Expose({ groups: ['field'] })
    @IsOptional()
    @TransformContainsQuery()
    @Max(50)
    title: string;

    @ApiProperty({ required: false })
    @Expose({ groups: ['field'] })
    @IsOptional()
    @TransformContainsQuery()
    @Max(400)
    description: string;



    constructor(obj: QueryTaskDTO) {
        Object.assign(this, obj);
    }
}


export function plainTaskToClass(value: QueryTaskDTO, groups: string[]) {
    return pickBy(plainToClass(QueryTaskDTO, value, { groups, excludeExtraneousValues: true, exposeUnsetFields: false }), e => isNotEmpty(e));
}


export class TransformAndValidateQueryTaskDTO implements PipeTransform {
    async transform(query: QueryTaskDTO, metadata: ArgumentMetadata) {
        const wholeQuery = plainTaskToClass(query, ['query', 'field']);

        const errors = await validate(wholeQuery);
        if (errors && errors.length > 0) {
            throw new BadRequestException(errors);
        }
        const queryOptions = plainTaskToClass(query, ['query']);
        const whereOptions = plainTaskToClass(query, ['field']);
        const timeOptions = plainTaskToClass(query, ['time']);
        const created_at = Between(timeOptions.after || new Date("100"), timeOptions.before || new Date("90000"))

        return { ...queryOptions, where: { ...whereOptions, created_at } }
    }
}




