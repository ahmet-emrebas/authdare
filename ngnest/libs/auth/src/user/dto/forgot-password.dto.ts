import { cloneDeep } from 'lodash';
import { ValidationPipe } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsOptional, Length } from 'class-validator';
import { v4 as uuid } from 'uuid';

export const ForgotPasswordValidationPipe = new ValidationPipe({ transform: true });

@Exclude()
export class ForgotPasswordDTO {
    @ApiProperty({ default: 'aemrebas.dev@gmail.com' })
    @Expose()
    @IsOptional()
    @IsEmail()
    readonly email!: string;

    @ApiProperty({ default: uuid() })
    @Expose()
    @IsOptional()
    @Length(1, 100)
    readonly code!: string;

    constructor(obj: ForgotPasswordDTO) {
        Object.assign(this, cloneDeep(obj));
    }
}
