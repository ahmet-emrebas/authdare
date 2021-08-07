import { ValidationPipe } from '@nestjs/common';
import { BaseClass, QueryDTO } from '@authdare/objects';
import { ApiProperty } from '@nestjs/swagger';
import { classToPlain, Exclude, Expose, Transform, Type } from 'class-transformer';
import { InitEach, InitOne, TLikeContains } from '@authdare/utils';
import { ValidateNested } from 'class-validator';
import { TaskEntity } from '../entity';

export const QueryTaskPipe = new ValidationPipe({
    transform: true,
    transformOptions: { excludeExtraneousValues: true, exposeUnsetFields: false },
});

@Exclude()
export class QueryTaskDTO extends BaseClass<QueryTaskDTO> {
    @Expose()
    @ApiProperty({ default: '', required: false })
    @TLikeContains()
    readonly title?: string;

    @Expose()
    @ApiProperty({ default: '', required: false })
    @TLikeContains()
    readonly description?: string;
}

export class FindManyTasksOptions extends QueryDTO<TaskEntity> {
    @Expose()
    @ApiProperty({ required: false })
    @ValidateNested()
    @Type(() => QueryTaskDTO)
    @Transform(({ value }) => new QueryTaskDTO(value), { toClassOnly: true })
    @Transform(({ value }) => classToPlain(value), { toPlainOnly: true })
    readonly where?: QueryTaskDTO;
}
