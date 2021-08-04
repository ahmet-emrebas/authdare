import { BaseClass } from "@authdare/objects";
import { Trim } from "@authdare/utils";
import { ValidationPipe } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, Length } from "class-validator";


export const LoginValidationPipe = new ValidationPipe({ transform: true, transformOptions: { excludeExtraneousValues: true } });


export class LoginDTO extends BaseClass<LoginDTO> {

    @Expose()
    @ApiProperty({ type: 'string', default: 'login@gmail.com' })
    @IsEmail()
    @Trim()
    readonly email!: string;

    @Expose()
    @ApiProperty({ type: 'string', default: 'password' })
    @Length(6, 100)
    @Trim()
    readonly password!: string


}