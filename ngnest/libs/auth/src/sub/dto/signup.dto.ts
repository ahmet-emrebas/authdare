import { BaseClass } from '@authdare/objects';
import { Trim } from '@authdare/utils';
import { ValidationPipe } from '@nestjs/common';
import { Exclude, Expose } from "class-transformer";
import { IsEmail, Length, NotContains } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { SnakeCase } from '@authdare/utils';

export const SignupValidationPipe = new ValidationPipe({ transform: true });


@Exclude()
export class SignupDTO extends BaseClass<SignupDTO> {


    @ApiProperty({ type: 'string', required: true, default: 'aemrebas.dev@gmail.com' })
    @Expose()
    @NotContains(' ')
    @IsEmail({}, { message: 'Email must be an email!' })
    readonly email!: string;

    @ApiProperty({ type: 'string', required: true, default: 'password' })
    @Expose()
    @NotContains(' ', { message: 'Password should not contain space!' })
    @Length(6, 100, { message: 'Password must be 6-100 characters!' })
    readonly password!: string

    @ApiProperty({ type: 'string', required: true, default: 'orgname' })
    @Expose()
    @Trim()
    @SnakeCase()
    @Length(3, 50)
    readonly orgname!: string;
}