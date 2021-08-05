import { BaseClass } from '@authdare/objects';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class CreateTaskDTO extends BaseClass<CreateTaskDTO>{


    @ApiProperty({ default: 'title' })
    @Expose()
    readonly title!: string

    @ApiProperty({ default: 'title' })
    @Expose()
    readonly description!: string



}