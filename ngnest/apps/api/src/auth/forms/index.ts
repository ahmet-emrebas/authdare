import { Length, IsEmail, IsOptional, isNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { CommonConstructor } from '@authdare/common/class';
import { ApiProperty } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

export class SignupForm extends CommonConstructor<SignupForm> {
    @ApiProperty({ type: 'string', minLength: 1, maxLength: 100, required: true })
    @Length(1, 100)
    firstName?: string;

    @ApiProperty({ type: 'string', minLength: 1, maxLength: 100, required: true })
    @Length(1, 100)
    lastName?: string;

    @ApiProperty({ type: 'string', minLength: 1, maxLength: 100, required: true, format: 'email' })
    @IsEmail()
    email?: string;

    @ApiProperty({ type: 'string', minLength: 1, maxLength: 100, required: true })
    @Length(6, 100)
    password?: string;

    @ApiProperty({ type: 'string', minLength: 1, maxLength: 100, required: true })
    @IsOptional()
    permissions?: string;

    @ApiProperty({ type: 'string', minLength: 1, maxLength: 100, required: true })
    @Length(3, 50)
    orgname?: string;
}

export class LoginForm {
    @ApiProperty({ type: 'string', minLength: 1, maxLength: 100, required: true, format: 'email' })
    @IsEmail()
    email?: string;

    @ApiProperty({ type: 'string', minLength: 1, maxLength: 100, required: true })
    @Length(6, 100)
    password?: string;
}

export class ForgotPasswordForm {
    @ApiProperty({ type: 'string', minLength: 1, maxLength: 100, required: false, format: 'email' })
    @IsEmail()
    email?: string;

    @ApiProperty({ type: 'string', minLength: 1, maxLength: 100, required: false })
    @Length(10, 100)
    @IsOptional()
    code?: string;
}

export const FormValidationPipe = new ValidationPipe({
    transform: true,
});
