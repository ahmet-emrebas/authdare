import { BaseClass, QueryDTO } from '@authdare/objects';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

QueryDTO;

@Exclude()
export class CreateTaskDTO extends BaseClass<CreateTaskDTO> {
    @ApiProperty({ default: 'title' })
    @Expose()
    readonly title!: string;

    @ApiProperty({ default: 'title' })
    @Expose()
    readonly description!: string;
}
