import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { IsOptional } from 'class-validator';
import { QueryDTO, t } from '@authdare/objects';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { TLikeContains } from '@authdare/utils';
import { TaskEntity } from '../entity';
import { cloneDeep } from 'lodash';

export const ValidateFindManyTaskOptionsPipe = new ValidationPipe({
    transform: false,
    errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
});

@Exclude()
export class QueryTaskDTO {
    @Expose()
    @ApiProperty({ default: '', required: false })
    @IsOptional()
    @TLikeContains()
    readonly title = t<string>();

    @Expose()
    @ApiProperty({ default: '', required: false })
    @IsOptional()
    @TLikeContains()
    readonly description = t<string>();

    @Expose()
    @ApiProperty({ default: '', required: false })
    @IsOptional()
    readonly status = t<string>();

    constructor(obj: QueryTaskDTO) {
        Object.assign(this, cloneDeep(obj));
    }
}

export class FindManyTasksOptions extends QueryDTO<TaskEntity> {}
