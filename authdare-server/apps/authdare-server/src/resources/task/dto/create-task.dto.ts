import { TaskStatus } from './../entities';
import { ArgumentMetadata, PipeTransform, BadRequestException } from '@nestjs/common';
import { TimestampFields } from "@authdare/base/entity";
import { IsNotBlank } from "@authdare/utils/validate";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, plainToClass, Transform } from "class-transformer";
import { IsIn, IsOptional, Length, validate } from "class-validator";
import { upperCase } from "lodash";

@Exclude()
export class CreateTaskDTO extends TimestampFields {

    @ApiProperty()
    @Expose()
    @Length(3, 50)
    @IsNotBlank()
    title?: string;

    @ApiProperty()
    @Expose()
    @IsNotBlank()
    @Length(3, 400)
    description?: string;

    @ApiProperty({ default: 'TODO' })
    @Expose()
    @Transform(({ value }) => value && typeof value == 'string' && upperCase(value))
    @IsOptional()
    @IsNotBlank()
    @IsIn(['DONE', 'IN PROGRESS', 'TODO'])
    status?: TaskStatus = 'TODO';

    constructor(obj: Partial<CreateTaskDTO>) {
        super();
        Object.assign(this, obj);
    }

}


export class TransformAndValidateCrateTaskDTO implements PipeTransform {
    async transform(value: CreateTaskDTO, metadata: ArgumentMetadata) {
        const transformedTaskDTO = plainToClass(CreateTaskDTO, value, { exposeDefaultValues: true });
        const errors = await validate(transformedTaskDTO);
        if (errors && errors.length > 0) {
            throw new BadRequestException(errors);
        }
        return transformedTaskDTO;
    }
}