import { TransformContainsQuery } from '@authdare/utils/transform/contains-query.transform';
import { TransformSplitBy } from '@authdare/utils/transform/split-by.transform';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsIn, IsOptional, Max, Min, ValidationArguments } from 'class-validator';
import { Like } from 'typeorm';
import { TaskEntity } from '../entities';

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



