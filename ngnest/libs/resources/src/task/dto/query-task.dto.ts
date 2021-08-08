import { QueryDTO } from '@authdare/objects';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { TLikeContains } from '@authdare/utils';
import { TaskEntity } from '../entity';
import { cloneDeep } from 'lodash';

@Exclude()
export class QueryTaskDTO {
    @Expose()
    @ApiProperty({ default: '', required: false })
    @TLikeContains()
    readonly title?: string;

    @Expose()
    @ApiProperty({ default: '', required: false })
    @TLikeContains()
    readonly description?: string;

    constructor(obj: QueryTaskDTO) {
        Object.assign(this, cloneDeep(obj));
    }
}

export class FindManyTasksOptions extends QueryDTO<TaskEntity> {}
