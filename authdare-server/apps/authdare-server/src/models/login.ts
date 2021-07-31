import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length } from "class-validator";
import { BaseValidator } from "./base.entity";

export class Login extends BaseValidator<Login> {
    @ApiProperty() @IsEmail() email: string;
    @ApiProperty() @Length(6, 50) password: string;
}