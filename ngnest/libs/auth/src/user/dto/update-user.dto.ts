import { cloneDeep } from 'lodash';
import { NotContains, Length, IsEmail, IsOptional } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export const UpdateUserValidationPipe = new ValidationPipe({ transform: true });

@Exclude()
export class UpdateUserDTO {
    @ApiProperty({ type: 'string', required: true, default: 'email@gmail.com' })
    @Expose()
    @IsOptional()
    @NotContains(' ')
    @IsEmail({}, { message: 'Email must be an email!' })
    readonly email?: string;

    @ApiProperty({ type: 'string', required: true, default: 'password' })
    @Expose()
    @IsOptional()
    @NotContains(' ', { message: 'Password should not contain space!' })
    @Length(6, 100, { message: 'Password must be 6-100 characters!' })
    readonly password?: string;

    constructor(obj: UpdateUserDTO) {
        Object.assign(this, cloneDeep(obj));
    }
}
