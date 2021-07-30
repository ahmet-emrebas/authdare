import { company, internet } from 'faker';
import { AuthStatusType, AuthStatuses } from './../entities';
import { ArgumentMetadata, PipeTransform, BadRequestException } from '@nestjs/common';
import { TimestampFields } from "@authdare/base/entity";
import { IsNotBlank } from "@authdare/utils/validate";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, plainToClass, Transform } from "class-transformer";
import { IsEmail, IsIn, IsOptional, IsString, Length, validate } from "class-validator";
import { upperCase } from "lodash";

@Exclude()
export class CreateAuthDTO extends TimestampFields {
    // email
    // password
    // org
    // status
    @ApiProperty({ default: internet.email() })
    @Expose()
    @Length(3, 50)
    @IsEmail()
    email?: string;

    @ApiProperty({ default: internet.password() })
    @Expose()
    @IsNotBlank()
    @Length(6, 400)
    password?: string;

    @ApiProperty({ default: company.companyName() })
    @Expose()
    @IsNotBlank()
    @Length(3, 50)
    orgname?: string;

    @ApiProperty({ default: company.companyName() })
    @Expose()
    @IsNotBlank({ each: true })
    @IsString({ each: true })
    permissions?: string[] | string

    @ApiProperty({ default: 'PASSIVE' })
    @Expose()
    @Transform(({ value }) => value && typeof value == 'string' && upperCase(value))
    @IsOptional()
    @IsNotBlank()
    @IsIn(AuthStatuses())
    status?: AuthStatusType = 'PASSIVE';

    constructor(obj: Partial<CreateAuthDTO>) {
        super();
        Object.assign(this, obj);
    }

}


export class TransformAndValidateCreateAuthPipe implements PipeTransform {
    async transform(value: CreateAuthDTO, metadata: ArgumentMetadata) {
        const transformedAuthDTO = plainToClass(CreateAuthDTO, value, { exposeDefaultValues: true });
        const errors = await validate(transformedAuthDTO);
        if (errors && errors.length > 0) {
            throw new BadRequestException(errors);
        }
        return transformedAuthDTO;
    }
}