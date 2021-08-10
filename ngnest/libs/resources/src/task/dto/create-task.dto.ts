import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { cloneDeep } from 'lodash';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Length, MinLength } from 'class-validator';

export const CreateTaskDTOPipe = new ValidationPipe({
    errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
});

@Exclude()
export class CreateTaskDTO {
    @ApiProperty({ default: 'title' })
    @Expose()
    @Length(3, 50)
    readonly title: string | undefined = undefined;

    @ApiProperty({ default: 'title' })
    @Expose()
    @MinLength(3)
    readonly description: string | undefined = undefined;

    constructor(obj: CreateTaskDTO) {
        Object.assign(this, cloneDeep(obj));
    }
}

console.log(Object.getOwnPropertyNames(new CreateTaskDTO(null!)));
