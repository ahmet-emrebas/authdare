import { ValidationPipe } from '@nestjs/common';
import { Trim, SnakeCase } from '@authdare/utils';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsEmail, Length, NotContains, ValidateNested } from 'class-validator';
import { BaseClass } from '@authdare/objects';

export const CreateAuthUserValidationPipe = new ValidationPipe({ transform: true });

/**
 * This DTO is for us to create a subscription manually.
 */
@Exclude()
export class CreateUserDTO extends BaseClass<CreateUserDTO> {
    @ApiProperty({ type: 'string', required: true, default: 'email@gmail.com' })
    @Expose()
    @NotContains(' ')
    @IsEmail({}, { message: 'Email must be an email!' })
    readonly email!: string;

    @ApiProperty({ type: 'string', required: true, default: 'password' })
    @Expose()
    @NotContains(' ', { message: 'Password should not contain space!' })
    @Length(6, 100, { message: 'Password must be 6-100 characters!' })
    readonly password!: string;

    @ApiProperty({ type: 'string', required: true, default: 'orgname' })
    @Expose()
    @Trim()
    @SnakeCase()
    @Length(3, 50)
    readonly orgname!: string;

    @ApiProperty({ required: false, default: [{ name: 'rolename', permissions: [{ method: 'get', resource: 'users' }] }] })
    @Expose()
    readonly roles!: string[];
}
