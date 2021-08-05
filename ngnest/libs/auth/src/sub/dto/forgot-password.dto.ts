import { ValidationPipe } from '@nestjs/common';
import { BaseClass } from "@authdare/objects";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsEmail, Length } from "class-validator";

export const ForgotPasswordValidationPipe = new ValidationPipe({ transform: true });

@Exclude()
export class ForgotPasswordDTO extends BaseClass<ForgotPasswordDTO> {

    @ApiProperty()
    @Expose()
    @IsEmail()
    readonly email!: string;

}

@Exclude()
export class ResetPasswordDTO extends BaseClass<ResetPasswordDTO> {

    @ApiProperty()
    @Expose()
    @Length(6, 100)
    readonly password!: string;

}


