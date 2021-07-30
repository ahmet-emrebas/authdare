import { company, internet } from 'faker';
import { ClientauthStatusType, ClientauthStatuses } from './../entities';
import { ArgumentMetadata, PipeTransform, BadRequestException } from '@nestjs/common';
import { TimestampFields } from "@authdare/base/entity";
import { IsNotBlank } from "@authdare/utils/validate";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, plainToClass, Transform } from "class-transformer";
import { IsEmail, IsIn, IsOptional, IsString, Length, validate } from "class-validator";
import { snakeCase, upperCase } from "lodash";

@Exclude()
export class CreateClientauthDTO extends TimestampFields {

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
    @Transform(({ value }) => value && typeof value == 'string' && snakeCase(value))
    @IsNotBlank()
    @Length(3, 50)
    orgname?: string;

    @ApiProperty({ default: ['read:users'] })
    @Expose()
    @IsString({ each: true })
    permissions?: string[];

    @ApiProperty({ default: 'PASSIVE' })
    @Expose()
    @Transform(({ value }) => value && typeof value == 'string' && upperCase(value))
    @IsOptional()
    @IsNotBlank()
    @IsIn(ClientauthStatuses())
    status?: ClientauthStatusType = 'PASSIVE';

    constructor(obj: Partial<CreateClientauthDTO>) {
        super();
        Object.assign(this, obj);
    }

}


export class TransformAndValidateCreateClientauthPipe implements PipeTransform {
    async transform(value: CreateClientauthDTO, metadata: ArgumentMetadata) {
        const transformedClientauthDTO = plainToClass(CreateClientauthDTO, value, { exposeDefaultValues: true });
        const errors = await validate(transformedClientauthDTO);
        if (errors && errors.length > 0) {
            throw new BadRequestException(errors);
        }
        return transformedClientauthDTO;
    }
}