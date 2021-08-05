import { ValidationPipe } from '@nestjs/common';
import { BaseClass } from "@authdare/objects";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsEmail } from "class-validator";

export const ForgotPasswordValidationPipe = new ValidationPipe({ transform: true });

@Exclude()
export class ForgotPasswordDTO extends BaseClass<ForgotPasswordDTO> {

    @ApiProperty({ default: 'aemrebas.dev@gmail.com' })
    @Expose()
    @IsEmail()
    readonly email!: string;

}


